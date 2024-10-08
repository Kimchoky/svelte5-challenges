import { getActionQueue } from "./queue.svelte";
import gallery from './gallery.svelte';


const actionQueue = getActionQueue();
let colorPicker: ColorPicker = $state({ color: 'currentColor'});

class Tool {
   
    name: string = '';    
    actionQueue = getActionQueue();
    constructor(name: string) {
        this.name = name;
    }
    toolActions: Array<ToolAction> = [];
    
    enqueueToolActions = (toolActions: Array<ToolAction>) => {
        this.actionQueue.pushItem({
            drawingTool: this,
            actions: toolActions,
        });
        this.actionQueue.increaseQueueCursor();
    }
    handleDrawAction(toolActions: Array<ToolAction>): void {
        toolActions.forEach(ta => {
            if (ta.method) {
                context[ta.method].bind(context);
                context[ta.method](...(ta.args ?? []));
            }
            if (ta.property) {
                context[ta.property] = ta.value;
            }
        });
    }
}

class GeneralTool extends Tool {

    undo = () => {
        this.actionQueue.decreaseQueueCursor();
        drawActionsInQueue(this.actionQueue.cursor);
    }
    redo = () => {
        this.actionQueue.increaseQueueCursor();
        drawActionsInQueue(this.actionQueue.cursor);
    }
    clear = (enqueue: boolean = true) => {
        context.clearRect.bind(context);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        if (enqueue) {
            this.enqueueToolActions([{
                method: 'clearRect',
                args: [0, 0, context.canvas.width, context.canvas.height],
            }]);
            this.actionQueue.spliceAfterCursor();
        }
    }
    saveData = () => {
        gallery.save(actionQueue.queue);
    }
    loadData = (index: number) => {

        const data = gallery.load();
        console.log('data', data);

        const queueItem = data[0].queueItem;
        console.log('qi', queueItem);

        const convertedData = queueItem.map(d => ({
            drawingTool: tools[d.drawingToolName],
            actions: d.actions,
        }))
        
        actionQueue.setQueueCursor(-1);
        actionQueue.spliceAfterCursor();
        actionQueue.pushItems(convertedData);

        actionQueue.setQueueCursor(actionQueue.queue.length - 1);
        drawActionsInQueue(this.actionQueue.cursor);
        
    }
    removeData = () => {
        gallery.remove(0);
    }

}

abstract class DrawingTool extends Tool {
   
    constructor(name: string) {
        super(name);
    }

    abstract handleMouseDown(pos: DimPosition): void;
    postHandleMouseDown = () => {
        // discard queue after cursor
        this.actionQueue.spliceAfterCursor();
    }
    abstract handleMouseUp(pos: DimPosition): void;
    postHandleMouseUp = () => {
        this.enqueueToolActions(this.toolActions);
        this.toolActions = [];
    }
    abstract handleMouseMove(pos: DimPosition): void;
    
}

class Pencil extends DrawingTool {

    diameter = 1;

    handleMouseDown = (pos: DimPosition) => {
        this.toolActions.push({ method: 'beginPath' });
        this.postHandleMouseDown();
    }
    handleMouseUp = (pos: DimPosition) => {
        this.toolActions.push({ method: 'closePath' });
        this.postHandleMouseUp();
    }
    
    handleMouseMove = (pos: DimPosition) => {
        if (pos.isMouseDown) {
            this.toolActions.push({ method: 'lineTo', args: [pos.x, pos.y] });
            this.toolActions.push({ property: 'lineWidth', value: this.diameter });
            this.toolActions.push({ property: 'strokeStyle', value: colorPicker.color });
            this.toolActions.push({ method: 'stroke' });
        }
        this.toolActions.push({ method: 'moveTo', args: [pos.x, pos.y] });
        this.handleDrawAction(this.toolActions)
    }

}


class Eraser extends DrawingTool {
    
    diameter = 10;

    deleteSpot = (pos: DimPosition) => {
        if (!pos.isMouseDown) return;

        this.toolActions.push({ method: 'clearRect', args: [pos.x - (this.diameter / 2), pos.y - (this.diameter / 2), this.diameter, this.diameter]});
        this.handleDrawAction(this.toolActions);
    }

    handleMouseDown = (pos: DimPosition) => {
        this.postHandleMouseDown();
        this.deleteSpot(pos);
    }
    handleMouseUp = (pos: DimPosition) => {
        this.postHandleMouseUp();
    }
    handleMouseMove = (pos: DimPosition) => {
        this.deleteSpot(pos);
    }

}

abstract class Shape extends DrawingTool {
    
    actualShapeDrawn = false;
    initPos: DimPosition = null;

    init = () => {
        this.initPos = null;
        this.actualShapeDrawn = false;
        this.toolActions = [];
    }
    handleMouseDown = (pos: DimPosition) => {
        this.initPos = {...pos};
        this.postHandleMouseDown();
    }
    handleMouseUp = (pos: DimPosition) => {
        if (!this.actualShapeDrawn) {
            this.init();
            return;
        }
        this.postHandleMouseUp();
    }
    handleMouseMove(pos: DimPosition): void {
        if (!pos.isMouseDown) return;
        this.actualShapeDrawn = true;        

        this.doHandleMouseMove(pos);
    }   

    abstract doHandleMouseMove(pos: DimPosition);
}

class Circle extends Shape {
    doHandleMouseMove(pos: DimPosition) {
        drawActionsInQueue();
        
        const r = getDistance(pos.x, pos.y, this.initPos.x, this.initPos.y);
        const sa = 0;
        const ea = Math.PI * 2;

        this.toolActions = [
            { method: 'beginPath'},
            { method: 'arc', args: [this.initPos.x, this.initPos.y, r, sa, ea] },
            { property: 'strokeStyle', value: colorPicker.color },
            { method: 'stroke'},
            { method: 'closePath'},
        ];

        this.handleDrawAction(this.toolActions);
    }
}

class Line extends Shape {
    doHandleMouseMove(pos: DimPosition) {
        drawActionsInQueue();
        this.toolActions = [
            { method: 'beginPath'},
            { method: 'moveTo', args: [pos.x, pos.y] },
            { method: 'lineTo', args: [this.initPos.x, this.initPos.y] },
            { property: 'strokeStyle', value: colorPicker.color },
            { method: 'stroke'},
            { method: 'closePath'},
        ];
        this.handleDrawAction(this.toolActions);
    }
}

class Square extends Shape {
    doHandleMouseMove(pos: DimPosition) {
        drawActionsInQueue();
        const w = pos.x - this.initPos.x;
        const h = pos.y - this.initPos.y;

        this.toolActions = [
            { method: 'beginPath'},
            { method: 'rect', args: [this.initPos.x, this.initPos.y, w, h] },
            { property: 'strokeStyle', value: colorPicker.color },
            { method: 'stroke'},
            { method: 'closePath'},
        ];
        this.handleDrawAction(this.toolActions);
    }
}

const tools = {
    pencil: new Pencil('pencil'),
    eraser: new Eraser('eraser'),
    general: new GeneralTool('general'),
    circle: new Circle('circle'),
    line: new Line('line'),
    square: new Square('square'),
}

//-- Tools
let context: CanvasRenderingContext2D;
let tool: DrawingTool = $state();

export function getTools(ctx?: CanvasRenderingContext2D) {
    if (ctx) 
        context = ctx;

    function setTool(name: string) {
        if (tools[name] === undefined)
            throw `No tool found with name: ${name}`;
        tool = tools[name];
    }

    return {
        get context() { return context },
        get tool() { return tool },
        get generalTool() { return tools.general },
        setTool,
    }
}

//-- shared functions
function drawActionsInQueue(lastIndex: number = actionQueue.cursor) {
    lastIndex = Math.min(lastIndex, actionQueue.cursor);
    getTools().generalTool.clear(false);

    for (let i = 0; i <= lastIndex; i++) {
        const aq = actionQueue.queue[i];
        aq?.drawingTool?.handleDrawAction(aq.actions);
    }
}


function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
}

export {
    colorPicker,
    DrawingTool,
    drawActionsInQueue
}
