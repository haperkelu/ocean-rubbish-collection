import { LEVEL_CONFIGS } from "../game/types";

interface Props {
  onStart: () => void;
}

export function MenuScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen game-bg p-6">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="text-7xl mb-4 swim-animate inline-block">🤿</div>
        <h1 className="text-5xl font-black text-cyan-300 tracking-tight drop-shadow-lg">
          SEA CLEANER
        </h1>
        <p className="mt-2 text-cyan-500 text-lg font-medium">Save the ocean, one piece of rubbish at a time</p>
      </div>

      {/* How to play */}
      <div
        className="rounded-2xl p-6 mb-8 max-w-md w-full"
        style={{ background: "rgba(0,20,40,0.85)", border: "1px solid rgba(0,200,200,0.25)" }}
      >
        <h2 className="text-cyan-300 font-bold text-lg mb-4 text-center">HOW TO PLAY</h2>
        <div className="space-y-2 text-sm text-cyan-100">
          <div className="flex items-center gap-3">
            <span className="text-xl">⌨️</span>
            <span>Use <span className="font-bold text-cyan-300">WASD</span> or <span className="font-bold text-cyan-300">Arrow Keys</span> to swim</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🗑️</span>
            <span>Collect rubbish to clean the ocean</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🐢</span>
            <span>Save trapped turtles before time runs out</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <span>Avoid hazards — they steal your time and slow you!</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-cyan-800">
          <h3 className="text-cyan-400 font-bold text-sm mb-2">HAZARDS</h3>
          <div className="grid grid-cols-2 gap-1 text-xs text-cyan-200">
            <div>🪼 Jellyfish — -5 sec</div>
            <div>🦑 Baby Squid — slows you</div>
            <div>🦑 Big Squid — -10 sec</div>
            <div>🦈 Shark — -5 sec + slow</div>
            <div className="col-span-2">🐙 Giant Squid Boss — lose a life!</div>
          </div>
        </div>
      </div>

      {/* Levels preview */}
      <div className="grid grid-cols-2 gap-3 max-w-md w-full mb-8">
        {LEVEL_CONFIGS.map((cfg) => (
          <div
            key={cfg.level}
            className="rounded-xl p-3 text-center"
            style={{ background: "rgba(0,30,60,0.7)", border: "1px solid rgba(0,150,180,0.2)" }}
          >
            <div className="text-cyan-400 font-bold text-xs mb-1">LEVEL {cfg.level}</div>
            <div className="text-white text-sm font-semibold leading-tight">{cfg.name}</div>
            <div className="text-cyan-500 text-xs mt-1">
              🗑️×{cfg.rubbishGoal} 🐢×{cfg.turtleGoal} ⏱️{cfg.timeLimit}s
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="px-12 py-4 rounded-2xl text-xl font-black tracking-wide transition-all hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, hsl(175,85%,45%), hsl(195,90%,40%))",
          color: "hsl(200,80%,5%)",
          boxShadow: "0 0 30px rgba(0,200,200,0.4)",
        }}
      >
        DIVE IN! 🌊
      </button>

      <p className="mt-4 text-cyan-700 text-xs">Mobile friendly — tap the on-screen controls</p>
    </div>
  );
}
