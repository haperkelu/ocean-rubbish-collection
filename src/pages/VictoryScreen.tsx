import { HudState } from "../game/types";

interface Props {
  hud: HudState;
  onMenu: () => void;
}

export function VictoryScreen({ hud, onMenu }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen game-bg p-6">
      <div className="text-center mb-6">
        <div className="text-7xl mb-4 swim-animate inline-block">🏆</div>
        <h1 className="text-5xl font-black text-yellow-300 tracking-tight drop-shadow-lg">YOU WIN!</h1>
        <p className="text-cyan-300 mt-2 text-lg">The ocean is clean! You're a hero!</p>
      </div>
      <div className="rounded-2xl p-6 mb-8 w-full max-w-sm text-center" style={{ background: "rgba(0,20,40,0.9)", border: "1px solid rgba(200,180,0,0.4)" }}>
        <div className="text-cyan-400 text-sm mb-3 font-mono">ALL 4 LEVELS COMPLETE</div>
        <div className="text-5xl font-black text-yellow-300 font-mono">{hud.score.toLocaleString()}</div>
        <div className="text-cyan-500 text-sm mt-1">final score</div>
        <div className="mt-5 pt-4 border-t border-cyan-900">
          <div className="text-sm text-cyan-300 leading-relaxed">
            Thanks to you, the sea is safe for turtles, fish, and all ocean creatures. Every piece of rubbish you collected made a difference!
          </div>
          <div className="flex justify-center gap-2 text-3xl mt-4">🐢🐠🦀🐙🐡</div>
        </div>
      </div>
      <button onClick={onMenu} className="px-10 py-4 rounded-2xl text-lg font-black tracking-wide transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, hsl(45,90%,55%), hsl(30,90%,50%))", color: "hsl(200,80%,5%)", boxShadow: "0 0 30px rgba(200,180,0,0.4)" }}>
        Play Again
      </button>
    </div>
  );
}
