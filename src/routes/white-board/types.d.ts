interface DimPosition {
    x: number,
    y: number,
    button: number,
    isMouseDown: boolean,
}

interface ToolInteract {
    drawingTool: DrawingTool,
    pencil: Function,
    eraser: Function,
    undo:Function,
    redo: Function,
}

interface QueueItem {
    drawingTool: DrawingTool,
    drawingToolName?: string,
    actions: Array<ToolAction>
}

type ToolAction = {
    method?: string,
    args?: Array<number>,
    property?: string,
    value?: string|number,
};

interface ColorPicker {
    color: string,
    favorites?: Array<string>,

}

interface Gallery {
    name?: string,
    queueItem: Array<QueueItem>
}