<script lang="ts">

    import DevelopProgress from "$lib/components/DevelopProgress.svelte";
    import developProgressData from "./DevelopProgressData";
    
    import Board from "./Board.svelte";
    import Toolbar from "./Toolbar.svelte";

    // let interact: ToolInteract|null  = $state(null);

</script>

<DevelopProgress data={developProgressData} />

<h1>White Board</h1>

<div class="x-wrapper">

    <div class="x-toolbar">
        <!-- <Toolbar direction="row" bind:interact /> -->
        <Toolbar direction="row" />
    </div>

    <div class="x-board">
        <Board />
    </div>

</div>

<style lang="scss">
    .x-wrapper {
        width: 100%;
        height: 70vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        position: relative;
    }

    .x-board {
        // flex-grow: 1;
        height: 100%;
    }

    .x-toolbar {
        // position: absolute;
        // top: 1rem;
        // left: 1rem;

        display: flex;
        justify-content: flex-start;
        padding: .5rem;
    }
</style>
