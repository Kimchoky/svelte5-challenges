<script>

    import store from './store.svelte';

    function setPencil() {
        store.state.tool = {
            name: 'Pencil',
        }
    }

    function setEraser() {
        store.state.tool = {
            name: 'Eraser',
        }
    }
</script>


<div class="x-wrapper">
    <button onclick={setPencil} class:x-active={store.state.tool.name==='Pencil'}>Pencil</button>
    <button onclick={setEraser} class:x-active={store.state.tool.name==='Eraser'}>Eraser</button>
</div>


<style lang="scss">
    .x-wrapper {
        
        button {
            background-color: transparent;
            color: currentColor;

            &.x-active {
                background-color: lightblue;
            }
        }
    }
</style>