import type { ReactNode } from "react";
import { Stage } from "@inlet/react-pixi";

interface CanvasProps {
    height?: number;
    width?: number;
    elements: ReactNode[];
}

export default function Canvas(props: CanvasProps) {
    const { height = 400, width = 250, elements = [] } = props;
    return (
        <Stage
            className="classified-editor__canvas-wrapper__canvas"
            width={width}
            height={height}
            options={{ backgroundColor: 0xffffff }}
        >
            {elements}
        </Stage>
    );
}
