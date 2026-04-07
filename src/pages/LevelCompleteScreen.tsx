import { HudState, LEVEL_CONFIGS } from "../game/types";

interface Props {
  hud: HudState;
  onNext: () => void;
  onMenu: () => void;
}

export function LevelCompleteScreen({ hud, onNext, onMenu }: Props) {
  const config = LEVEL_CONFIGS[hud.level - 1];
  const isLastLevel = hud.level >= LEVEL_CONFIGS.length;
  const timeBonus = Math.floor(hud.timeRemaining) * 10;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen game-bg p-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">🎉</div>
        <h1 className="text-4xl font-black text-cyan-300 tracking-tight">LEVEL COMPLETE!</h1>
        <p className="text-cyan-400 mt-1 font-medium">{config.name}</p>
      </div>
      <div className="rounded-2xl p-6 mb-6 w-full max-w-sm" style={{ background: "rgba(0,20,40,0.9)", border: "1px solid rgba(0,200,200,0.3)" }}>
        <h2 className="text-cyan-400 font-bold text-sm text-center mb-4 font-mono">RESULTS</h2>
        <div className="space-y-3">
          <Row icon="🗑️" label="Rubbish Collected" value={`${hud.rubbishCollected}/${config.rubbishGoal}`} />
          <Row icon="🐢" label="Turtles Saved" value={`${hud.turtlesSaved}/${config.turtleGoal}`} />
          <Row icon="⏱️" label="Time Remaining" value={`${Math.ceil(hud.timeRemaining)}s`} />
          <div className="border-t border-cyan-800 pt-3 mt-3">
            <Row icon="⭐" label="Time Bonus" value={`+${timeBonus}`} highlight />
            <Row icon="🏆" label="Total Score" value={hud.score.toLocaleString()} highlight />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button onClick={onMenu} className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95" style={{ background: "rgba(0,60,100,0.8)", color: "hsl(180,80%,70%)", border: "1px solid rgba(0,200,200,0.2)" }}>
          Menu
        </button>
        {!isLastLevel && (
          <button onClick={onNext} className="px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95" style={{ background: "linear-gradient(135deg, hsl(175,85%,45%), hsl(195,90%,40%))", color: "hsl(200,80%,5%)", boxShadow: "0 0 20px rgba(0,200,200,0.35)" }}>
            Next Level →
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ icon, label, value, highlight }: { icon: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-cyan-300 text-sm"><span>{icon}</span><span>{label}</span></span>
      <span className={`font-bold font-mono text-sm ${highlight ? "text-yellow-300" : "text-white"}`}>{value}</span>
    </div>
  );
}
