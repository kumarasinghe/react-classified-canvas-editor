import type { TextStyleFontWeight } from "pixi.js";
import { useRef, useState } from "react";
import type { TextElementProps } from "./TextElement";
import generateAd, { AdGeneratorData } from "./generateAd";

export type TextConfig = TextElementProps & {
    value: string;
};

interface ControlPanelProps {
    onAddText?: (addTextData: TextConfig) => void;
}

const fonts = [
    "Times New Roman",
    "Arial",
    "Courier New",
    "Serif",
    "Monospace",
    "Comic Sans MS",
];

const DEFAULT_FONT_FAMILY = fonts[0]!;
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_WEIGHT = "500";
const DEFAULT_LETTER_SPACING = 1;
const DEFAULT_LINE_HEIGHT = 14;
const DEFAULT_MAX_WIDTH = undefined;
const DEFAULT_TEXT_VALUE = "Text";
const DEFAULT_AD_BUDGET = 40;

export default function ControlPanel(props: ControlPanelProps) {
    const { onAddText } = props;

    /********** REFS AND HOOKS **********/
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const [textConfig, setTextConfig] = useState<TextConfig>({
        fontFamily: DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_FONT_SIZE,
        fontWeight: DEFAULT_FONT_WEIGHT,
        letterSpacing: DEFAULT_LETTER_SPACING,
        lineHeight: DEFAULT_LINE_HEIGHT,
        value: DEFAULT_TEXT_VALUE,
        width: DEFAULT_MAX_WIDTH ?? Number.MAX_SAFE_INTEGER,
    });

    const [generatorData, setGeneratorData] = useState<AdGeneratorData>({
        item: "",
        attributes: "",
        price: "",
        budget: DEFAULT_AD_BUDGET,
        phone: "",
    });

    const [loading, setLoading] = useState(false);

    /********** EVENT HANDLERS **********/

    const handleAddText = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onAddText?.(textConfig);
    };

    const handleGenerate = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);
            const generatedAd = await generateAd(generatorData);
            setTextConfig({ ...textConfig, value: generatedAd });
            if (descriptionRef.current)
                descriptionRef.current.value = generatedAd;
        } catch (error) {
            alert("Unable to generate the ad!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="classified-editor__control-panel">
            <fieldset>
                <legend>Generate</legend>

                {/* item */}
                <label>
                    What are you selling or buying?
                    <input
                        placeholder="Apartment, Toyota Prius..."
                        onChange={(event) =>
                            setGeneratorData({
                                ...generatorData,
                                item: event.target.value,
                            })
                        }
                    />
                </label>

                <label>
                    Highlights:
                    <textarea
                        placeholder="2 bedrooms, air conditioned..."
                        onChange={(event) =>
                            setGeneratorData({
                                ...generatorData,
                                attributes: event.target.value,
                            })
                        }
                    />
                </label>

                {/* price */}
                <label>
                    Price $:
                    <input
                        type="number"
                        placeholder="5000"
                        onChange={(event) =>
                            setGeneratorData({
                                ...generatorData,
                                price: event.target.value,
                            })
                        }
                    />
                </label>

                {/* phone */}
                <label>
                    Phone:
                    <input
                        onChange={(event) =>
                            setGeneratorData({
                                ...generatorData,
                                phone: event.target.value,
                            })
                        }
                    />
                </label>

                {/* budget */}
                <label>
                    Ad budget $:
                    <input
                        type="number"
                        defaultValue={DEFAULT_AD_BUDGET}
                        onChange={(event) =>
                            setGeneratorData({
                                ...generatorData,
                                budget: parseFloat(event.target.value),
                            })
                        }
                    />
                </label>

                <button
                    onClick={(event) => {
                        handleGenerate(event);
                    }}
                    disabled={loading}
                >
                    {loading ? "Please wait..." : "Generate"}
                </button>
            </fieldset>

            <fieldset>
                <legend>Customize</legend>

                {/* description */}
                <label>
                    Description:
                    <textarea
                        ref={descriptionRef}
                        placeholder="Type your advert..."
                        rows={5}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                value: event.target.value,
                            })
                        }
                    />
                </label>

                {/* font family */}

                <label>
                    Font Family:
                    <br />
                    <select
                        defaultValue={DEFAULT_FONT_FAMILY}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                fontFamily: event.target.value,
                            })
                        }
                    >
                        {fonts.map((font) => (
                            <option
                                key={font}
                                value={font}
                            >
                                {font}
                            </option>
                        ))}
                    </select>
                </label>

                {/* font size */}

                <label>
                    Font Size:
                    <input
                        type="number"
                        defaultValue={DEFAULT_FONT_SIZE}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                fontSize: parseFloat(event.target.value),
                            })
                        }
                    />
                </label>

                {/* font weight */}

                <label>
                    Font Weight:
                    <input
                        type="number"
                        defaultValue={DEFAULT_FONT_WEIGHT}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                fontWeight: event.target
                                    .value as TextStyleFontWeight,
                            })
                        }
                    />
                </label>

                {/* letter spacing */}

                <label>
                    Letter Spacing:
                    <input
                        type="number"
                        defaultValue={DEFAULT_LETTER_SPACING}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                letterSpacing: parseInt(event.target.value),
                            })
                        }
                    />
                </label>

                {/* line height */}

                <label>
                    Line Height:
                    <input
                        type="number"
                        defaultValue={DEFAULT_LINE_HEIGHT}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                lineHeight: parseFloat(event.target.value),
                            })
                        }
                    />
                </label>

                {/* width */}

                <label>
                    Max Width:
                    <input
                        type="number"
                        defaultValue={DEFAULT_MAX_WIDTH}
                        onChange={(event) =>
                            setTextConfig({
                                ...textConfig,
                                width: parseFloat(event.target.value),
                            })
                        }
                    />
                </label>

                {/* buttons */}

                <button onClick={handleAddText}>Add Text</button>
            </fieldset>
        </form>
    );
}
