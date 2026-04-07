import { RefObject } from "react";
import { HudState, CANVAS_WIDTH, LEVEL_CONFIGS } from "../game/types";
import { GameCanvas } from "../game/GameCanvas";

interface Props {
  hud: HudState;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

function HeartRow({ lives }: { lives: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((i) => (
        <span key={i} className="text-xl" style={{ opacity: i <= lives ? 1 : 0.2 }}>❤️</span>
      ))}
    </div>
  );
}

function TimerBar({ time, max }: { time: number; max: number }) {
  const pct = (time / max) * 100;
  const color = pct > 50 ? "hsl(160,80%,45%)" : pct > 25 ? "hsl(45,90%,55%)" : "hsl(0,80%,55%)";
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: "rgba(0,0,0,0.4)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color, transition: "width 0.5s linear" }} />
    </div>
  );
}

export function GameScreen({ hud, canvasRef }: Props) {
  const config = LEVEL_CONFIGS[hud.level - 1];

  const handleTouch = (key: string, down: boolean) => {
    window.dispatchEvent(new KeyboardEvent(down ? "keydown" : "keyup", { key, bubbles: true }));
  };
  const btn = (label: string, key: string) => (
    <button
      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold select-none"
      style={{ background: "rgba(0,150,180,0.3)", border: "1px solid rgba(0,200,200,0.3)", touchAction: "none" }}
      onTouchStart={(e) => { e.preventDefault(); handleTouch(key, true); }}
      onTouchEnd={(e) => { e.preventDefault(); handleTouch(key, false); }}
      onMouseDown={() => handleTouch(key, true)}
      onMouseUp={() => handleTouch(key, false)}
      onMouseLeave={() => handleTouch(key, false)}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen game-bg p-4 gap-4">
      {/* HUD */}
      <div className="w-full max-w-4xl rounded-xl px-4 py-3 hud-panel" style={{ maxWidth: CANVAS_WIDTH }}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-cyan-500 font-mono">LEVEL {hud.level}</div>
            <div className="text-cyan-200 font-bold text-sm leading-tight">{config.name}</div>
          </div>
          <div className="flex-1 max-w-32">
            <div className="text-center text-cyan-300 font-black text-2xl font-mono leading-none">
              {String(Math.ceil(hud.timeRemaining)).padStart(2, "0")}s
            </div>
            <TimerBar time={hud.timeRemaining} max={config.timeLimit} />
          </div>
          <div className="text-right">
            <div className="text-xs text-cyan-500 font-mono mb-1">LIVES</div>
            <HeartRow lives={hud.lives} />
          </div>
          <div className="text-right min-w-20">
            <div className="text-xs text-cyan-500 font-mono">SCORE</div>
            <div className="text-cyan-300 font-black text-lg font-mono">{hud.score.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ width: "100%", maxWidth: CANVAS_WIDTH }}>
        <GameCanvas canvasRef={canvasRef} />
      </div>

      {/* Mobile D-pad */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />{btn("▲", "ArrowUp")}<div />
        {btn("◀", "ArrowLeft")}{btn("▼", "ArrowDown")}{btn("▶", "ArrowRight")}
      </div>

      <p className="text-cyan-700 text-xs font-mono">WASD / Arrow keys to move</p>
    </div>
  );
}
