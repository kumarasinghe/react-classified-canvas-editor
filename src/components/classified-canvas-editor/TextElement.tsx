import { Text } from "@inlet/react-pixi";
import {
    InteractionEvent,
    TextStyle,
    TextStyleAlign,
    TextStyleFill,
    TextStyleFontWeight,
} from "pixi.js";
import { useRef, useState } from "react";

export type TextElementProps = {
    align?: TextStyleAlign;
    fill?: TextStyleFill;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: TextStyleFontWeight;
    letterSpacing?: number;
    lineHeight?: number;
    value?: string;
    width?: number;
    wordWrap?: boolean;
    x?: number;
    y?: number;
};

export default function TextElement(props: TextElementProps) {
    const {
        align = "justify",
        fill = "#000000",
        fontFamily = "Arial, Helvetica, sans-serif",
        fontSize = 12,
        fontWeight = "normal",
        letterSpacing = 1,
        lineHeight = 1,
        value = "Text",
        width = Number.MAX_SAFE_INTEGER,
        wordWrap = true,
        x = 0,
        y = 0,
    } = props;

    const textRef = useRef(null);
    const [position, setPosition] = useState({ x, y });
    const [isDragging, setIsDragging] = useState(false);

    const updatePosition = (event: InteractionEvent) => {
        const { x, y } = event.data.global;
        setPosition({ x, y });
    };

    const handleDragStart = (event: InteractionEvent) => {
        updatePosition(event);
        setIsDragging(true);
    };

    const handleDragMove = (event: InteractionEvent) => {
        if (isDragging) {
            updatePosition(event);
        }
    };

    const handleDragEnd = (event: InteractionEvent) => {
        updatePosition(event);
        setIsDragging(false);
    };

    return (
        <Text
            ref={textRef}
            text={value}
            x={position.x}
            y={position.y}
            pointerdown={handleDragStart}
            pointermove={handleDragMove}
            pointerup={handleDragEnd}
            pointerupoutside={handleDragEnd}
            interactive={true}
            anchor={[0.5, 0.5]}
            roundPixels={true}
            style={
                new TextStyle({
                    align,
                    fontFamily,
                    fontSize,
                    fontWeight,
                    fill,
                    letterSpacing,
                    wordWrap,
                    wordWrapWidth: width,
                    lineHeight,
                })
            }
        />
    );
}
