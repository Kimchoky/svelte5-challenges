<script lang="ts">
    import { onMount } from 'svelte';
    import { getActionQueue, } from './modules/queue.svelte';
    import { getTools, drawActionsInQueue, DrawingTool, } from './modules/tools.svelte';
    
    let actinoQueue = getActionQueue();
    let tools = getTools();
    let canvas: HTMLCanvasElement;

    let xCursorClass = $derived('x-cursor-' + tools?.tool?.name);
    
    let pos: DimPosition = $state({ x: 0, y: 0, button: 0, isMouseDown: false });
    
    function onResize() {
        canvas.setAttribute('width', ''+canvas.getBoundingClientRect().width);
        canvas.setAttribute('height', ''+canvas.getBoundingClientRect().height);
        drawActionsInQueue();
    }

    function setPosOnCanvas(e: MouseEvent|TouchEvent) {
        const rect = canvas.getBoundingClientRect();
        const ev = (e instanceof TouchEvent ? e.targetTouches[0] : e );

        pos.x = ev.clientX - rect.left;
        pos.y = ev.clientY - rect.top;
    }

    function handleMouseMove(e: MouseEvent|TouchEvent) {
        setPosOnCanvas(e);
        tools.tool.handleMouseMove(pos);
    }
    function handleMouseDown(e: MouseEvent|TouchEvent) {
        pos.isMouseDown = true;
        setPosOnCanvas(e);
        tools.tool.handleMouseDown(pos);

    }

    function handleMouseUp(e: MouseEvent|TouchEvent) {
        pos.isMouseDown = false;
        tools.tool.handleMouseUp(pos);
    }


    onMount(()=>{
        canvas = <HTMLCanvasElement>document.getElementById('canvas');
        tools = getTools(<CanvasRenderingContext2D>canvas.getContext('2d'));
        tools.setTool('pencil');
        
        onResize();

    })

    $effect(() => {
        if (tools.tool) {
            console.log('tool changed : ' + tools.tool.name);
            // interact.drawingTool = drawingTool;
        }
    })


    let q = $derived(actinoQueue.queue.map((aq, idx) => {
        return Object.assign({ cursor: (idx === actinoQueue.cursor) }, aq);
    }));

</script>

<svelte:window onresize={onResize} />

<!-- <div style="position: fixed; top: 0; right: 0;">
    <div>{pos.x}, {pos.y}, [{pos.isMouseDown}]</div>
    <div>{tools?.tool?.initPos?.x}, {tools?.tool?.initPos?.y}</div>
</div> -->

<canvas id="canvas"
    class="{xCursorClass}"
    onmousemove={handleMouseMove}
    ontouchmove={handleMouseMove}
    onmousedown={handleMouseDown}
    ontouchstart={handleMouseDown}
    onmouseup={handleMouseUp}
    ontouchend={handleMouseUp}
    ></canvas>

<div style="position: fixed; top: 2rem; right: 0;">
    <ul>
        {#each q as aq, idx}
        <li>{aq.cursor ? '⭐':''} {idx}: {aq.drawingTool.name}</li>
        {/each}
    </ul>
</div>

<style lang="scss">
    #canvas {
        border: 1px solid currentColor;
        width: 100%;
        height: 100%;

    }

    .x-cursor-pencil {
    }
    .x-cursor-eraser {
    }
</style>