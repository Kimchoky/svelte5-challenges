<script lang="ts">
    import { onMount } from 'svelte';
    import cursor from './cursor.svelte';

    let pos = $state({ x: 0, y: 0});
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    
    let isMouseDown = $state(false);

    function init() {
        ctx.strokeStyle = '#f00';
        canvas.setAttribute('width', ''+canvas.getBoundingClientRect().width);
        canvas.setAttribute('height', ''+canvas.getBoundingClientRect().height);
    }

    function handleMouseMove(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect();
        pos.x = e.x - rect.left;
        pos.y = e.y - rect.top;
        
        if (isMouseDown) {
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
        ctx.moveTo(pos.x, pos.y);
    }
    function handleMouseDown() {
        // ctx.moveTo()
        isMouseDown = true;

        ctx.beginPath();
    }

    function handleMouseUp() {
        isMouseDown = false;
    }

    onMount(()=>{
        canvas = <HTMLCanvasElement>document.getElementById('canvas');
        ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        init();

    })

</script>

<div style="position: fixed; top: 0; right: 0;">
    {pos.x}, {pos.y}, [{isMouseDown}]
</div>

<canvas id="canvas"
    onmousemove={handleMouseMove}
    onmousedown={handleMouseDown}
    onmouseup={handleMouseUp}
    ></canvas>

<style>
    #canvas {
        border: 1px solid currentColor;
        width: 100%;
        height: 100%;
    }
</style>