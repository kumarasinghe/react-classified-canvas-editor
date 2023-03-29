import { useState } from "react";
import Canvas from "./Canvas";
import "./style.scss";
import type { ReactNode } from "react";
import TextElement from "./TextElement";
import ControlPanel, { TextConfig } from "./ControlPanel";

const AD_WIDTH = 250;
const AD_HEIGHT = 300;

const ClassifiedCanvasEditor = () => {
    const [elements, setElements] = useState<ReactNode[]>([]);

    const handleAddText = (textConfig: TextConfig) => {
        const textElement = (
            <TextElement
                key={textConfig.value}
                {...textConfig}
                width={AD_WIDTH - 10}
                x={50}
                y={50}
            />
        );
        setElements([...elements, textElement]);
    };

    return (
        <div className="classified-editor">
            <div className="classified-editor__canvas-wrapper">
                <Canvas
                    elements={elements}
                    width={AD_WIDTH}
                    height={AD_HEIGHT}
                />
                {/* tip */}
                <div className="classified-editor__canvas-wrapper__tip">
                    Tip: Use your mouse to move the text on canvas
                </div>
            </div>

            <ControlPanel onAddText={handleAddText} />
        </div>
    );
};

export default ClassifiedCanvasEditor;
