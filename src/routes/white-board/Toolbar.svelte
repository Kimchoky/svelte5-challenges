<script lang="ts">
    import { getActionQueue, } from "./modules/queue.svelte";
    import { getTools } from "./modules/tools.svelte";

    const actionQueue = getActionQueue();
    const tools = getTools();

    let iconWidth = $state('2rem');
    let iconHeight = $state('2rem');

    let icons = $derived({
        pencil: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>`,
        eraser: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 24 24"><path fill="currentColor" d="m15.87 2.669l4.968 4.968a2.25 2.25 0 0 1 0 3.182l-8.682 8.68l6.098.001a.75.75 0 0 1 .743.648l.007.102a.75.75 0 0 1-.648.743l-.102.007l-8.41.001a2.24 2.24 0 0 1-1.714-.655l-4.969-4.969a2.25 2.25 0 0 1 0-3.182l9.527-9.526a2.25 2.25 0 0 1 3.182 0m-4.172 15.09l-5.955-5.956l-1.507 1.467a.75.75 0 0 0 0 1.06l4.946 4.946a.75.75 0 0 0 1.06-.016z"/></svg>`,
        circle: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 48 48"><path fill="currentColor" d="M24 6.5C14.335 6.5 6.5 14.335 6.5 24S14.335 41.5 24 41.5S41.5 33.665 41.5 24S33.665 6.5 24 6.5M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24"/></svg>`,
        line: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42"/></svg>`,
        square: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v18H3zm2 2v14h14V5z"/></svg>`,
        clear: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 1024 1024"><path fill="currentColor" d="m899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4c0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4c14.2-2.4 23.7-15.9 21.2-30M204 390h272V182h72v208h272v104H204zm468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260z"/></svg>`,
        undo: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13L3 9m0 0l4-4M3 9h13a5 5 0 0 1 0 10h-5"/></svg>`,
        redo: `<svg xmlns="http://www.w3.org/2000/svg" width="${iconWidth}" height="${iconHeight}" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 13l4-4m0 0l-4-4m4 4H8a5 5 0 0 0 0 10h5"/></svg>`,
    });
  
    // let { direction, interact = $bindable(), }: { direction:string, interact: ToolInteract|null } = $props();
    let { direction, }: { direction:string } = $props();

</script>

<div class="x-wrapper"
    style=" --direction: {direction}; ">
    <button onclick={()=>tools.setPencil()} class:x-active={tools?.tool?.name==='pencil'}>{@html icons.pencil}</button>
    <button onclick={()=>tools.setEraser()} class:x-active={tools?.tool?.name==='eraser'}>{@html icons.eraser}</button>
    <button onclick={()=>tools.setCircle()} class:x-active={tools?.tool?.name==='circle'}>{@html icons.circle}</button>
    <button onclick={()=>tools.setLine()} class:x-active={tools?.tool?.name==='line'}>{@html icons.line}</button>
    <button onclick={()=>tools.setSquare()} class:x-active={tools?.tool?.name==='square'}>{@html icons.square}</button>
    <button onclick={()=>tools.generalTool.clear()}>{@html icons.clear}</button>
    <button onclick={()=>tools.generalTool.undo()} disabled={actionQueue.cursor < 0}>{@html icons.undo}</button>
    <button onclick={()=>tools.generalTool.redo()} disabled={actionQueue.cursor >= actionQueue.queue.length - 1}>{@html icons.redo}</button>
    <button style="visibility: hidden;"><svg width="0" height="0"></svg></button>
</div>


<style lang="scss">
    .x-wrapper {
        display: flex;
        flex-direction: var(--direction);
        gap: .3rem;

        button {
            background-color: transparent;
            color: currentColor;
            padding: .3rem;

            &.x-active {
                background-color: rgb(255, 219, 229);
            }

        }
    }
</style>