import { HudState, LEVEL_CONFIGS } from "../game/types";

interface Props {
  hud: HudState;
  onRetry: () => void;
  onMenu: () => void;
}

export function GameOverScreen({ hud, onRetry, onMenu }: Props) {
  const config = LEVEL_CONFIGS[hud.level - 1];
  const reason = hud.lives <= 0 ? "You lost all your lives!" : "You ran out of time!";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen game-bg p-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">💔</div>
        <h1 className="text-4xl font-black text-red-400 tracking-tight">GAME OVER</h1>
        <p className="text-cyan-500 mt-1">{reason}</p>
      </div>
      <div className="rounded-2xl p-6 mb-6 w-full max-w-sm text-center" style={{ background: "rgba(0,20,40,0.9)", border: "1px solid rgba(200,50,50,0.3)" }}>
        <div className="text-cyan-400 text-sm mb-3 font-mono">LEVEL {hud.level} — {config.name}</div>
        <div className="text-4xl font-black text-white font-mono">{hud.score.toLocaleString()}</div>
        <div className="text-cyan-500 text-sm mt-1">points earned</div>
        <div className="mt-4 pt-4 border-t border-cyan-900 flex justify-around text-sm">
          <div><div className="text-2xl">🗑️</div><div className="text-white font-bold">{hud.rubbishCollected}/{config.rubbishGoal}</div></div>
          <div><div className="text-2xl">🐢</div><div className="text-white font-bold">{hud.turtlesSaved}/{config.turtleGoal}</div></div>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={onMenu} className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95" style={{ background: "rgba(0,60,100,0.8)", color: "hsl(180,80%,70%)", border: "1px solid rgba(0,200,200,0.2)" }}>
          Menu
        </button>
        <button onClick={onRetry} className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, hsl(0,80%,55%), hsl(20,90%,50%))", color: "white", boxShadow: "0 0 20px rgba(200,50,50,0.35)" }}>
          Try Again 🔄
        </button>
      </div>
    </div>
  );
}
