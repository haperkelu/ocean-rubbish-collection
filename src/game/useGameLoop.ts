import { useCallback, useEffect, useRef, useState } from "react";
import {
  BASE_SPEED,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ENTITY_RADIUS,
  Entity,
  GameRef,
  HAZARD_EFFECTS,
  HudState,
  INVINCIBLE_MS,
  LEVEL_CONFIGS,
  LevelConfig,
  PLAYER_RADIUS,
  Phase,
} from "./types";

function randomId() { return Math.random().toString(36).slice(2, 9); }
function rand(min: number, max: number) { return Math.random() * (max - min) + min; }

function spawnEntities(config: LevelConfig): Entity[] {
  const entities: Entity[] = [];
  for (let i = 0; i < config.rubbishCount; i++) {
    entities.push({ id: randomId(), type: "Rubbish", x: rand(40, CANVAS_WIDTH - 40), y: rand(40, CANVAS_HEIGHT - 40), vx: 0, vy: 0 });
  }
  for (let i = 0; i < config.turtleCount; i++) {
    entities.push({ id: randomId(), type: "Turtle", x: rand(40, CANVAS_WIDTH - 40), y: rand(40, CANVAS_HEIGHT - 40), vx: rand(-25, 25), vy: rand(-25, 25) });
  }
  config.hazards.forEach((hazard) => {
    const count = hazard === "Boss" ? 1 : hazard === "Shark" ? 2 : 3;
    for (let i = 0; i < count; i++) {
      const spd = hazard === "Boss" ? 80 : hazard === "Shark" ? 100 : 60;
      entities.push({
        id: randomId(), type: hazard,
        x: rand(40, CANVAS_WIDTH - 40), y: rand(40, CANVAS_HEIGHT - 40),
        vx: (Math.random() < 0.5 ? 1 : -1) * spd,
        vy: (Math.random() < 0.5 ? 1 : -1) * spd,
      });
    }
  });
  return entities;
}

function collides(ax: number, ay: number, bx: number, by: number, r: number): boolean {
  const dx = ax - bx, dy = ay - by;
  return dx * dx + dy * dy < r * r;
}

const INITIAL_G = (): GameRef => ({
  phase: "menu", level: 1, lives: 3, score: 0,
  rubbishCollected: 0, turtlesSaved: 0, timeRemaining: 60,
  speed: BASE_SPEED, invincible: false, invincibleUntil: 0,
  message: null, messageType: "info", messageUntil: 0,
  player: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
  entities: [],
});

export function useGameLoop() {
  const g = useRef<GameRef>(INITIAL_G());
  const keys = useRef<Set<string>>(new Set());
  const raf = useRef<number>(0);
  const lastT = useRef<number>(0);
  const secAcc = useRef<number>(0);

  // Minimal React state only for screen transitions + HUD (updated ~10fps)
  const [hud, setHud] = useState<HudState>({
    phase: "menu", level: 1, lives: 3, score: 0,
    rubbishCollected: 0, turtlesSaved: 0, timeRemaining: 60,
    message: null, messageType: "info",
  });

  // Canvas ref so the render loop can draw without React
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const syncHud = useCallback(() => {
    const s = g.current;
    setHud({
      phase: s.phase, level: s.level, lives: s.lives, score: s.score,
      rubbishCollected: s.rubbishCollected, turtlesSaved: s.turtlesSaved,
      timeRemaining: s.timeRemaining,
      message: s.message, messageType: s.messageType,
    });
  }, []);

  const showMsg = useCallback((msg: string, type: GameRef["messageType"] = "info") => {
    g.current.message = msg;
    g.current.messageType = type;
    g.current.messageUntil = performance.now() + 2200;
  }, []);

  const startLevel = useCallback((levelNum: number, lives: number, score: number) => {
    const config = LEVEL_CONFIGS[levelNum - 1];
    if (!config) return;
    const s = g.current;
    s.phase = "playing";
    s.level = levelNum;
    s.lives = lives;
    s.score = score;
    s.rubbishCollected = 0;
    s.turtlesSaved = 0;
    s.timeRemaining = config.timeLimit;
    s.speed = BASE_SPEED;
    s.invincible = false;
    s.invincibleUntil = 0;
    s.message = null;
    s.messageUntil = 0;
    s.player = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 };
    s.entities = spawnEntities(config);
    lastT.current = 0;
    secAcc.current = 0;
    syncHud();
  }, [syncHud]);

  const startGame = useCallback(() => startLevel(1, 3, 0), [startLevel]);
  const nextLevel = useCallback(() => {
    const next = g.current.level + 1;
    if (next > LEVEL_CONFIGS.length) {
      g.current.phase = "victory";
      syncHud();
    } else {
      startLevel(next, g.current.lives, g.current.score);
    }
  }, [startLevel, syncHud]);
  const retryLevel = useCallback(() => startLevel(g.current.level, 3, g.current.score), [startLevel]);
  const goToMenu = useCallback(() => {
    g.current.phase = "menu";
    syncHud();
  }, [syncHud]);

  // Key listeners
  useEffect(() => {
    const dn = (e: KeyboardEvent) => { e.preventDefault(); keys.current.add(e.key); };
    const up = (e: KeyboardEvent) => keys.current.delete(e.key);
    window.addEventListener("keydown", dn);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", dn); window.removeEventListener("keyup", up); };
  }, []);

  // Game loop — runs independently of React, renders directly to canvas
  useEffect(() => {
    let hudTimer = 0;

    const loop = (now: number) => {
      raf.current = requestAnimationFrame(loop);
      const s = g.current;

      if (s.phase !== "playing") return;

      if (!lastT.current) lastT.current = now;
      const dt = Math.min((now - lastT.current) / 1000, 0.05); // cap at 50ms
      lastT.current = now;

      // --- Timer ---
      secAcc.current += dt;
      if (secAcc.current >= 1) {
        secAcc.current -= 1;
        s.timeRemaining = Math.max(0, s.timeRemaining - 1);
      }
      if (s.timeRemaining <= 0) {
        s.phase = "gameOver";
        syncHud();
        return;
      }

      // --- Invincibility ---
      if (s.invincible && now >= s.invincibleUntil) {
        s.invincible = false;
      }

      // --- Message expiry ---
      if (s.message && now >= s.messageUntil) {
        s.message = null;
      }

      // --- Player movement ---
      const k = keys.current;
      const spd = s.speed * dt;
      if (k.has("ArrowUp")    || k.has("w") || k.has("W")) s.player.y -= spd;
      if (k.has("ArrowDown")  || k.has("s") || k.has("S")) s.player.y += spd;
      if (k.has("ArrowLeft")  || k.has("a") || k.has("A")) s.player.x -= spd;
      if (k.has("ArrowRight") || k.has("d") || k.has("D")) s.player.x += spd;
      s.player.x = Math.max(PLAYER_RADIUS, Math.min(CANVAS_WIDTH  - PLAYER_RADIUS, s.player.x));
      s.player.y = Math.max(PLAYER_RADIUS, Math.min(CANVAS_HEIGHT - PLAYER_RADIUS, s.player.y));

      // --- Entities ---
      const config = LEVEL_CONFIGS[s.level - 1];
      const hitRadius = PLAYER_RADIUS + ENTITY_RADIUS - 6;
      const surviving: Entity[] = [];

      for (const e of s.entities) {
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        if (e.x < ENTITY_RADIUS || e.x > CANVAS_WIDTH - ENTITY_RADIUS)  { e.vx = -e.vx; e.x = Math.max(ENTITY_RADIUS, Math.min(CANVAS_WIDTH - ENTITY_RADIUS, e.x)); }
        if (e.y < ENTITY_RADIUS || e.y > CANVAS_HEIGHT - ENTITY_RADIUS) { e.vy = -e.vy; e.y = Math.max(ENTITY_RADIUS, Math.min(CANVAS_HEIGHT - ENTITY_RADIUS, e.y)); }

        if (collides(s.player.x, s.player.y, e.x, e.y, hitRadius)) {
          if (e.type === "Rubbish") {
            s.rubbishCollected++;
            s.score += 100;
            showMsg(`Rubbish! (${s.rubbishCollected}/${config.rubbishGoal})`, "success");
            continue; // removed
          } else if (e.type === "Turtle") {
            s.turtlesSaved++;
            s.score += 250;
            showMsg(`Turtle saved! (${s.turtlesSaved}/${config.turtleGoal})`, "success");
            continue; // removed
          } else if (!s.invincible) {
            const fx = HAZARD_EFFECTS[e.type as keyof typeof HAZARD_EFFECTS];
            if (fx) {
              s.timeRemaining = Math.max(0, s.timeRemaining - fx.timePenalty);
              s.speed = Math.max(80, s.speed - fx.speedPenalty * 20);
              s.lives = Math.max(0, s.lives - fx.livesLost);
              s.invincible = true;
              s.invincibleUntil = now + INVINCIBLE_MS;
              showMsg(fx.message, "danger");
              if (s.lives <= 0) { s.phase = "gameOver"; syncHud(); return; }
            }
          }
        }
        surviving.push(e);
      }
      s.entities = surviving;

      // --- Level complete ---
      if (s.rubbishCollected >= config.rubbishGoal && s.turtlesSaved >= config.turtleGoal) {
        s.score += Math.floor(s.timeRemaining) * 10;
        s.phase = "levelComplete";
        syncHud();
        return;
      }

      // --- Draw to canvas ---
      const canvas = canvasRef.current;
      if (canvas) draw(canvas, s, now);

      // --- Sync HUD to React ~10fps ---
      if (now - hudTimer > 100) {
        hudTimer = now;
        syncHud();
      }
    };

    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, [syncHud, showMsg]);

  return { hud, g, canvasRef, startGame, nextLevel, retryLevel, goToMenu };
}

// ─── Canvas renderer ─────────────────────────────────────────────────────────

const EMOJI_MAP: Record<string, string> = {
  Rubbish: "🗑️", Turtle: "🐢",
  Jellyfish: "🪼", "Baby Squid": "🦑", "Big Squid": "🦑",
  Shark: "🦈", Boss: "🐙",
};

// Pre-create bubbles so they don't flicker
const BUBBLES = Array.from({ length: 14 }, () => ({
  x: Math.random() * CANVAS_WIDTH,
  y: Math.random() * CANVAS_HEIGHT,
  r: 3 + Math.random() * 7,
  phase: Math.random() * Math.PI * 2,
  speed: 0.8 + Math.random() * 0.8,
}));

function draw(canvas: HTMLCanvasElement, s: GameRef, now: number) {
  const ctx = canvas.getContext("2d")!;
  const W = CANVAS_WIDTH, H = CANVAS_HEIGHT;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "hsl(200,80%,12%)");
  bg.addColorStop(0.5, "hsl(210,85%,17%)");
  bg.addColorStop(1, "hsl(220,90%,9%)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Subtle wave lines
  ctx.save();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 4; i++) {
    const y = 80 + i * 110;
    const off = (now / (6000 + i * 2000)) * W * 2;
    ctx.beginPath();
    ctx.moveTo(-off % W, y);
    for (let x = 0; x <= W + 40; x += 40) {
      ctx.lineTo(x, y + Math.sin((x + off) * 0.015) * 6);
    }
    ctx.strokeStyle = "hsl(180,80%,70%)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();

  // Bubbles
  ctx.save();
  ctx.globalAlpha = 0.18;
  for (const b of BUBBLES) {
    const t = now / 1000;
    const floatY = b.y - ((t * 18 * b.speed) % (H + b.r * 2));
    const cx = b.x + Math.sin(t * b.speed + b.phase) * 6;
    ctx.beginPath();
    ctx.arc(cx, floatY, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = "hsl(185,70%,75%)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();

  // Sand bottom
  const sand = ctx.createLinearGradient(0, H - 45, 0, H);
  sand.addColorStop(0, "rgba(0,0,0,0)");
  sand.addColorStop(1, "rgba(180,140,60,0.22)");
  ctx.fillStyle = sand;
  ctx.fillRect(0, H - 45, W, 45);

  // Seaweed
  const sweedPositions = [50, 180, 400, 600, 740];
  ctx.font = "22px serif";
  ctx.textBaseline = "bottom";
  for (const sx of sweedPositions) {
    const wobble = Math.sin(now / 800 + sx) * 4;
    ctx.save();
    ctx.translate(sx + wobble, H);
    ctx.fillText("🌿", -10, 0);
    ctx.restore();
  }

  // Entities
  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const e of s.entities) {
    const emoji = EMOJI_MAP[e.type] ?? "?";
    ctx.save();
    if (e.type === "Boss") {
      ctx.shadowColor = "rgba(255,0,200,0.8)";
      ctx.shadowBlur = 16;
      ctx.font = "36px serif";
    }
    ctx.fillText(emoji, e.x, e.y);
    ctx.restore();
  }

  // Player
  ctx.save();
  const flash = s.invincible && Math.floor(now / 160) % 2 === 0;
  if (!flash) {
    ctx.shadowColor = "rgba(0,255,200,0.6)";
    ctx.shadowBlur = 12;
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🤿", s.player.x, s.player.y);
  }
  ctx.restore();

  // Damage flash overlay
  if (s.invincible) {
    const t = (s.invincibleUntil - now) / INVINCIBLE_MS;
    ctx.save();
    ctx.globalAlpha = 0.18 * t;
    ctx.fillStyle = "hsl(0,85%,55%)";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  // In-canvas mini progress (top-right)
  ctx.save();
  ctx.fillStyle = "rgba(0,15,35,0.78)";
  ctx.beginPath();
  ctx.roundRect(W - 130, 8, 120, 36, 8);
  ctx.fill();
  ctx.font = "13px system-ui, sans-serif";
  ctx.fillStyle = "hsl(180,80%,75%)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const config = LEVEL_CONFIGS[s.level - 1];
  ctx.fillText(`🗑️${s.rubbishCollected}/${config.rubbishGoal}  🐢${s.turtlesSaved}/${config.turtleGoal}`, W - 70, 26);
  ctx.restore();

  // Message overlay
  if (s.message) {
    const fadeProgress = Math.min(1, (s.messageUntil - now) / 400); // fade out last 400ms
    ctx.save();
    ctx.globalAlpha = Math.max(0, fadeProgress);
    const bg2 = s.messageType === "danger" ? "rgba(200,30,30,0.88)"
      : s.messageType === "success" ? "rgba(20,155,90,0.88)"
      : "rgba(0,70,110,0.88)";
    const textW = Math.min(W - 40, ctx.measureText(s.message).width + 48);
    const mx = (W - textW) / 2, my = H / 2 - 22;
    ctx.fillStyle = bg2;
    ctx.beginPath();
    ctx.roundRect(mx, my, textW, 44, 10);
    ctx.fill();
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.message, W / 2, my + 22);
    ctx.restore();
  }
}
