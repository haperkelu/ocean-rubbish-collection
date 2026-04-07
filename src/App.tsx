import { useGameLoop } from "./game/useGameLoop";
import { MenuScreen } from "./pages/MenuScreen";
import { GameScreen } from "./pages/GameScreen";
import { LevelCompleteScreen } from "./pages/LevelCompleteScreen";
import { GameOverScreen } from "./pages/GameOverScreen";
import { VictoryScreen } from "./pages/VictoryScreen";

function App() {
  const { hud, canvasRef, startGame, nextLevel, retryLevel, goToMenu } = useGameLoop();

  switch (hud.phase) {
    case "menu":
      return <MenuScreen onStart={startGame} />;
    case "playing":
      return <GameScreen hud={hud} canvasRef={canvasRef} />;
    case "levelComplete":
      return <LevelCompleteScreen hud={hud} onNext={nextLevel} onMenu={goToMenu} />;
    case "gameOver":
      return <GameOverScreen hud={hud} onRetry={retryLevel} onMenu={goToMenu} />;
    case "victory":
      return <VictoryScreen hud={hud} onMenu={goToMenu} />;
    default:
      return <MenuScreen onStart={startGame} />;
  }
}

export default App;
