import { RefObject } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./types";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export function GameCanvas({ canvasRef }: Props) {
  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{
        width: "100%",
        maxWidth: CANVAS_WIDTH,
        aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`,
        borderRadius: "0.75rem",
        border: "1px solid rgba(0,200,200,0.25)",
        display: "block",
      }}
    />
  );
}
