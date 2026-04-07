# 🌊 Sea Cleaner — Ocean Rubbish Collection Game

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║   🤿  ~~~  DIVE IN AND SAVE THE OCEAN!  ~~~  🌊             ║
║                                                              ║
║   🗑️  Collect Rubbish    🐢  Save Turtles    🦈  Dodge Sharks ║
╚══════════════════════════════════════════════════════════════╝
```

[![STEM Games](https://img.shields.io/badge/STEM_Games-Australia-blue?style=for-the-badge)](https://www.stemgames.org.au/)
[![Built with React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)](https://ocean-rubbish-collection.vercel.app)

</div>

---

## 🎮 What Is This Game?

You are an **underwater diver** 🤿 on a mission to clean up the ocean!

- 🗑️ **Collect rubbish** floating in the water
- 🐢 **Rescue trapped turtles** before time runs out
- 🪼🦑🦈🐙 **Dodge dangerous sea creatures** that slow you down or steal your lives
- ⭐ **Beat 4 levels** to become an Ocean Hero!

> **🌱 Why does this matter?**
> Every year **8 million tonnes** of plastic enters our oceans. Real divers and volunteers clean beaches and reefs around the world. This game shows what that challenge looks like underwater!

---

## 🗺️ The 4 Levels

```
  LEVEL 1          LEVEL 2          LEVEL 3          LEVEL 4
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Shallow  │    │  Squid   │    │  Shark   │    │  BOSS    │
│  Waters  │ →  │   Zone   │ →  │Territory │ →  │  Giant   │
│          │    │          │    │          │    │  Squid   │
│ 🪼 only  │    │🪼🦑🦑    │    │🪼🦑🦑🦈  │    │🪼🦑🦈🐙  │
│ 60s      │    │ 60s      │    │ 75s      │    │ 90s      │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
 Collect 3🗑️    Collect 5🗑️    Collect 6🗑️    Collect 8🗑️
  Save 1🐢       Save 2🐢       Save 2🐢       Save 3🐢
```

---

## 🏗️ How Is the Game Built? (Architecture)

Think of the game like a **submarine** 🚢 — it has different rooms, each doing a special job:

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR BROWSER                            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    App.tsx  🧠                       │   │
│  │          THE CAPTAIN — decides which screen to show  │   │
│  └──────┬──────┬──────┬───────┬────────────────────────┘   │
│         │      │      │       │                             │
│    ┌────┴─┐ ┌──┴──┐ ┌─┴──┐ ┌──┴──┐ ┌────────┐            │
│    │Menu  │ │Game │ │Level│ │Game │ │Victory │            │
│    │Screen│ │     │ │Done │ │Over │ │Screen  │            │
│    │  🏠  │ │ 🎮  │ │ 🎉  │ │ 💔  │ │  🏆   │            │
│    └──────┘ └──┬──┘ └─────┘ └─────┘ └────────┘            │
│                │                                            │
│         ┌──────┴──────────────────────┐                    │
│         │     Game Engine  ⚙️          │                    │
│         │                             │                    │
│  ┌──────┴──────┐    ┌─────────────┐  │                    │
│  │ useGameLoop │    │  GameCanvas │  │                    │
│  │  (the brain)│    │  (the eyes) │  │                    │
│  │  🧮 Physics │    │  🎨 Drawing │  │                    │
│  │  💥 Collide │    │  🌊 Waves   │  │                    │
│  │  ⏱️ Timer   │    │  🐟 Sprites │  │                    │
│  └──────┬──────┘    └─────────────┘  │                    │
│         │                             │                    │
│  ┌──────┴──────┐                      │                    │
│  │  types.ts   │                      │                    │
│  │  📋 Rules & │                      │                    │
│  │  Game Data  │                      │                    │
│  └─────────────┘                      │                    │
│         └──────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Map — What Does Each File Do?

```
ocean-rubbish-collection/
│
├── 📄 index.html              ← The door into the game (HTML entry point)
├── ⚙️  vite.config.ts          ← Build tool settings (like a recipe for baking the app)
├── 📦 package.json            ← List of all tools/libraries we use
├── 🔷 tsconfig.json           ← TypeScript rules (like grammar rules for the code)
├── 🚀 vercel.json             ← Deployment settings for putting it online
│
└── src/                       ← All the actual game code lives here!
    │
    ├── 🧠 App.tsx             ← The main brain — chooses which screen to show
    ├── 🎨 index.css           ← Visual style (colours, animations, fonts)
    ├── 🚪 main.tsx            ← The front door — starts React and loads App
    │
    ├── game/                  ← THE GAME ENGINE ROOM ⚙️
    │   ├── 📋 types.ts        ← All the game rules and data structures
    │   ├── 🔄 useGameLoop.ts  ← The beating heart — runs 60 times per second!
    │   └── 🖼️ GameCanvas.tsx  ← The TV screen — draws everything you see
    │
    ├── pages/                 ← ALL THE DIFFERENT SCREENS 📺
    │   ├── 🏠 MenuScreen.tsx  ← Start screen with instructions
    │   ├── 🎮 GameScreen.tsx  ← The actual playing screen (HUD + canvas + controls)
    │   ├── 🎉 LevelCompleteScreen.tsx  ← Well done! Shows your score
    │   ├── 💔 GameOverScreen.tsx       ← Oh no! Try again?
    │   └── 🏆 VictoryScreen.tsx        ← You win! Ocean is clean!
    │
    ├── components/ui/         ← REUSABLE BUILDING BLOCKS 🧱
    │   └── (buttons, cards, menus — ready-made pieces)
    │
    ├── hooks/                 ← SMART HELPERS 🤖
    │   ├── use-mobile.tsx     ← Detects if you're on a phone or tablet
    │   └── use-toast.ts       ← Shows little pop-up messages
    │
    └── lib/
        └── utils.ts           ← Tiny helper tools used everywhere
```

---

## 🎯 The Game State Machine — How Screens Connect

A **state machine** is like a set of traffic lights — you can only be in ONE state at a time, and specific events make you change state.

```
                    ┌─────────┐
           START    │         │
          ────────► │  menu   │ ◄──────────── onMenu()
                    │   🏠    │
                    └────┬────┘
                         │ onStart()
                         ▼
                    ┌─────────┐
                    │         │
              ┌──── │ playing │ ────┐
              │     │   🎮    │     │
              │     └─────────┘     │
              │                     │
    lives=0   │                     │ rubbishGoal ✓
    OR time=0 │                     │ AND turtleGoal ✓
              ▼                     ▼
        ┌──────────┐         ┌──────────────┐
        │          │         │              │
        │ gameOver │         │levelComplete │
        │    💔    │         │     🎉       │
        └────┬─────┘         └──────┬───────┘
             │                      │
    onRetry()│               onNext()│ (if more levels)
             │                      │
             └──────────────────────┘
                         │
                         │ after Level 4
                         ▼
                    ┌─────────┐
                    │         │
                    │ victory │
                    │   🏆    │
                    └─────────┘
```

> 💡 **CS Concept: State Machine**
> Your phone uses state machines too — it's either `locked`, `home screen`, `in an app`, or `sleeping`. Each state only allows certain transitions!

---

## ⚙️ The Game Loop — The Heartbeat

The **game loop** is what makes the game feel alive. It runs **60 times every second** — like frames in a movie!

```
Every frame (1/60th of a second):
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. ⏱️  TICK THE TIMER     time -= deltaTime               │
│                                                             │
│  2. ⌨️  READ KEYS          Was W/A/S/D pressed?             │
│                                                             │
│  3. 🤿 MOVE PLAYER         player.x += speed * deltaTime   │
│                                                             │
│  4. 🐟 MOVE ENTITIES       each hazard/rubbish moves        │
│         └─ bounce off walls if they hit the edge            │
│                                                             │
│  5. 💥 CHECK COLLISIONS    did the diver touch anything?    │
│         ├─ 🗑️ Rubbish → collect it! score += 100           │
│         ├─ 🐢 Turtle  → save it!  score += 250             │
│         └─ 🪼🦈🐙 Hazard → take damage! lose time/life     │
│                                                             │
│  6. 🎯 CHECK WIN/LOSE      goals met? time ran out?         │
│                                                             │
│  7. 🎨 DRAW EVERYTHING     paint the canvas                 │
│                                                             │
│  8. 🔁 REPEAT              requestAnimationFrame(loop)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

> 💡 **CS Concept: Game Loop**
> `requestAnimationFrame` tells the browser "run this function before drawing the next frame". This syncs the game with your screen's refresh rate (usually 60Hz).

---

## 💥 Collision Detection — The Maths!

How does the game know when the diver touches a jellyfish?  
It uses the **distance formula** from maths class! 📐

```
         🤿 (player)         🪼 (jellyfish)
          at (px, py)          at (jx, jy)
               *─────────────────*
               │      distance   │
               └─────────────────┘

Distance = √( (px-jx)² + (py-jy)² )

If distance < (playerRadius + jellyfishRadius)
                     → COLLISION! 💥
```

In code this looks like:

```typescript
function collides(ax, ay, bx, by, r) {
  const dx = ax - bx;   // horizontal gap
  const dy = ay - by;   // vertical gap
  return dx*dx + dy*dy < r*r;  // no square root needed!
}
```

> 💡 **Maths Trick:** We compare `dx² + dy²` against `r²` instead of taking the square root — it's much faster and gives the same answer!

---

## 🏊 Entity Movement — Bouncing Off Walls

Hazards and turtles move around using **velocity** (speed + direction).

```
  Entity has:
  ┌──────────────┐
  │ x, y         │  ← position (where it is)
  │ vx, vy       │  ← velocity (how fast it moves each second)
  └──────────────┘

  Every frame:
  x = x + (vx × deltaTime)     ← move right/left
  y = y + (vy × deltaTime)     ← move up/down

  Hit left or right wall?  →  vx = -vx  (flip direction! 🔄)
  Hit top or bottom wall?  →  vy = -vy  (flip direction! 🔄)
```

This is the same physics used in the classic **Pong** game from 1972!

---

## 🎨 What Gets Drawn Each Frame

The canvas is like a whiteboard — it gets **completely erased and redrawn** every frame:

```
Drawing order (back to front, like layers):
┌─────────────────────────────────────────┐
│  Layer 1: 🌊 Ocean background gradient   │ ← painted first (behind everything)
│  Layer 2: ≋≋≋ Animated wave lines        │
│  Layer 3: ○○○ Floating bubbles           │
│  Layer 4: 🏜️  Sandy bottom              │
│  Layer 5: 🌿  Swaying seaweed           │
│  Layer 6: 🗑️🐢🪼🦑🦈🐙 All entities    │
│  Layer 7: 🤿  The player (diver)         │
│  Layer 8: 📊 Mini progress bar (top)     │
│  Layer 9: 💬 Message overlay             │ ← painted last (in front of everything)
└─────────────────────────────────────────┘
```

> 💡 **CS Concept: Z-ordering / Painter's Algorithm**
> Just like a real painter, we draw backgrounds first and foreground details last. This is called the **Painter's Algorithm**.

---

## 📊 The HUD (Heads-Up Display)

The HUD shows game info without covering the action. It updates **10 times per second** (not 60) to keep React fast:

```
┌──────────────────────────────────────────────────────────┐
│  LEVEL 2        ⏱️ 42s  ████████░░  ❤️❤️❤️   SCORE      │
│  Squid Zone     [timer bar]          LIVES   001,250     │
└──────────────────────────────────────────────────────────┘
          │              │              │          │
          │              │              │          └── Your total points
          │              │              └── ❤️=alive  🖤=lost
          │              └── Green→Yellow→Red as time runs out
          └── Which level and its name
```

> 💡 **CS Concept: Separation of Concerns**
> The HUD (React) and the game physics (canvas loop) run independently. The game loop runs at 60fps but only tells React about changes 10 times per second — this keeps everything fast!

---

## 🏆 Scoring System

```
Action                Points
──────────────────────────────
🗑️ Collect rubbish      +100
🐢 Save a turtle        +250
⏱️ Time bonus           +10 per second remaining
                           (awarded when level complete)

Hazard Penalties:
🪼 Jellyfish            -5 seconds
🦑 Baby Squid           slower speed for a while
🦑 Big Squid            -10 seconds
🦈 Shark                -5 seconds + slower
🐙 Giant Squid Boss     -1 LIFE 💔
```

After a hit → **2 second invincibility** ⚡ (you flash and can't be hurt again immediately)

---

## 🔧 The Tech Stack — Tools We Used

```
┌─────────────────────────────────────────────────────────────┐
│                    TECH STACK                               │
│                                                             │
│  🔷 TypeScript    → Like JavaScript but with type safety    │
│                     (stops you making silly mistakes!)      │
│                                                             │
│  ⚛️  React 18     → Builds the UI screens (menu, HUD etc)  │
│                     React re-draws only what CHANGED        │
│                                                             │
│  🖼️  HTML Canvas  → Draws the actual game (60fps!)         │
│                     Pixel-perfect control over everything   │
│                                                             │
│  💨  Tailwind CSS → Makes things look pretty fast           │
│                     class="text-cyan-300 font-bold" etc     │
│                                                             │
│  ⚡  Vite         → Bundles & builds the code for the web  │
│                     Super fast dev server for testing       │
│                                                             │
│  🚀  Vercel       → Puts the game online for FREE          │
│                     Auto-deploys when you push to GitHub    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧩 Key TypeScript Concepts in This Game

### 1. Interfaces — Describing the Shape of Data

```typescript
// This describes what every "entity" (rubbish, turtle, hazard) looks like:
interface Entity {
  id: string;      // a unique name like "abc123"
  type: string;    // "Rubbish" | "Turtle" | "Shark" etc.
  x: number;       // horizontal position
  y: number;       // vertical position
  vx: number;      // horizontal speed (velocity x)
  vy: number;      // vertical speed (velocity y)
}
```

### 2. Union Types — Either/Or

```typescript
// A Phase can ONLY be one of these — nothing else!
type Phase = "menu" | "playing" | "levelComplete" | "gameOver" | "victory";
```

### 3. Hooks — React's Superpower

```typescript
// useRef → holds data that doesn't trigger re-renders (perfect for game state!)
const g = useRef<GameRef>(INITIAL_G());

// useState → triggers screen updates when it changes (used for HUD)
const [hud, setHud] = useState<HudState>(...);

// useEffect → runs code when the component mounts (sets up the game loop!)
useEffect(() => {
  raf.current = requestAnimationFrame(loop);
  return () => cancelAnimationFrame(raf.current); // cleanup!
}, []);
```

---

## 🎓 STEM Concepts This Game Teaches

| Concept | Where in the game | Subject |
|---------|-------------------|---------|
| **Distance formula** `√(dx²+dy²)` | Collision detection | Maths |
| **Velocity & position** `x += vx × dt` | Entity movement | Physics |
| **Bouncing (reflection)** `vx = -vx` | Wall collisions | Physics |
| **Frame rate & time** 60fps, deltaTime | Game loop | Physics / CS |
| **State machines** menu→playing→gameover | App flow | CS / Engineering |
| **Painter's Algorithm** (draw back to front) | Canvas rendering | CS / Art |
| **Tree data structures** (component tree) | React architecture | CS |
| **Event-driven programming** (keydown events) | Input handling | CS |
| **Ocean plastic pollution** | Game theme | Environmental Science |
| **Marine ecosystem** (turtles, sharks, squid) | Characters | Biology |

---

## 🚀 Run It Yourself

### Play Online
👉 **[ocean-rubbish-collection.vercel.app](https://ocean-rubbish-collection.vercel.app)**

### Run Locally (for developers)

**You'll need:** [Node.js](https://nodejs.org) installed (free!)

```bash
# 1. Download the code
git clone https://github.com/haperkelu/ocean-rubbish-collection.git
cd ocean-rubbish-collection

# 2. Install all the libraries
npm install

# 3. Start the game on your computer
npm run dev

# 4. Open your browser and go to:
#    http://localhost:5173
```

That's it! You should see the game running. 🎮

---

## 🛠️ How to Extend the Game

Want to add your own features? Here are some ideas and where to start:

### 🐟 Add a new sea creature

Edit `src/game/types.ts`:
```typescript
// Add to HazardType:
type HazardType = "Jellyfish" | "Baby Squid" | ... | "YourNewFish";

// Add its effect:
HAZARD_EFFECTS["YourNewFish"] = {
  timePenalty: 8,
  speedPenalty: 0,
  livesLost: 0,
  message: "Got stung by a stonefish! -8 seconds!"
};
```

### 🌟 Add a new level

Edit `LEVEL_CONFIGS` in `src/game/types.ts`:
```typescript
{
  level: 5,
  name: "The Deep Dark",
  rubbishGoal: 10,
  turtleGoal: 4,
  timeLimit: 120,
  hazards: ["Jellyfish", "Shark", "Boss"],
  rubbishCount: 15,
  turtleCount: 5,
  description: "The deepest part of the ocean — darkest and most dangerous!",
}
```

### 🎨 Change the colours

Edit `src/index.css` — look for `--color-` variables.

### 💎 Add a power-up

In `useGameLoop.ts`, add a new entity type `"SpeedBoost"` and handle it in the collision detection section!

---

## 📐 Architecture Decision Log

| Decision | Why we made it |
|----------|---------------|
| **Canvas for game, React for UI** | Canvas gives 60fps control; React is great for menus and score displays |
| **`useRef` for game state, `useState` for HUD** | Game state changes 60×/sec — `useRef` doesn't trigger re-renders. HUD only updates 10×/sec via `useState` |
| **`requestAnimationFrame`** | Syncs with screen refresh. Automatically pauses when tab is hidden (saves battery!) |
| **deltaTime physics** (`x += vx * dt`) | Movement stays the same speed on fast AND slow computers |
| **Emoji for sprites** | No image files needed! Works everywhere, kids recognise them instantly |
| **Invincibility frames after hit** | Classic game design — gives the player time to recover. Used since Space Invaders (1978)! |

---

## 🌊 Real Ocean Facts (Science Corner)

> Did you know these facts that inspired this game?

- 🐢 **Sea turtles** mistake plastic bags for jellyfish and eat them — this is fatal
- 🗑️ The **Great Pacific Garbage Patch** is twice the size of Texas
- 🦈 **Sharks** are vital to ocean health — without them, the whole ecosystem collapses
- 🐙 **Octopuses** (the boss's cousin) are incredibly intelligent — they can open jars!
- 🌿 **Seagrass** (like the 🌿 at the bottom) produces 10% of Earth's oxygen

---

## 👥 Contributing

This game is built for **STEM Games Australia** 🇦🇺 — a competition for students to learn coding, maths, and science!

Want to contribute? Here's how:

1. 🍴 **Fork** this repository (your own copy)
2. 🌿 **Create a branch** `git checkout -b my-cool-feature`
3. 💻 **Make your changes** and test them with `npm run dev`
4. ✅ **Commit** `git commit -m "Add my cool feature"`
5. 🚀 **Push** `git push origin my-cool-feature`
6. 🔃 **Open a Pull Request** and describe what you built!

---

## 📜 Licence

Built with 💙 for ocean conservation and STEM education.
