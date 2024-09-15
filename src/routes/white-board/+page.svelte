<script>
    import DevelopProgress from "$lib/components/DevelopProgress.svelte";
    import Board from "./Board.svelte";
    import developProgressData from "./DevelopProgress";
    import Toolbar from "./Toolbar.svelte";
</script>

<DevelopProgress data={developProgressData} />

<h1>White Board</h1>

<div class="x-wrapper">
    <div class="x-board">
        <Board />
    </div>

    <div class="x-toolbar">
        <Toolbar />
    </div>
</div>

<style lang="scss">
    .x-wrapper {
        width: 100%;
        height: 80vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }

    .x-board {
        flex-grow: 1;
    }

    .x-toolbar {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }
</style>
