interface Block {
    render: (ctx: CanvasRenderingContext2D) => void;
}

type ClassifiedCanvasProps = {
    height?: number;
    width?: number;
    blocks: Block[];
};
