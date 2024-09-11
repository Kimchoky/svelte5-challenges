<script>

    import "../app.scss";

    import { picoTheme } from "$lib/store/theme";
    import Header from "./Header.svelte";

    let {children, data} = $props();

    $picoTheme = data.picoTheme;

    $effect(() => {
        document.documentElement.setAttribute('data-theme', $picoTheme);
        document.cookie = `pico:theme=${$picoTheme};max-age=31536000;path=/`;
    });

</script>

<svelte:head>
    <title>Coding Challenges</title>
</svelte:head>

<div class="wrapper">
    <header>
        <Header />
    </header>

    <main class="container">
        {@render children()}
    </main>

    <footer>
        <div>
            <hr>
            <div>kimchoky, 2024.</div>
        </div>
    </footer>
</div>


<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    header {
    }

    main {
        flex-grow: 1;
        padding-top: 2rem;
        padding-bottom: 2rem;
    }

    footer > div {
        text-align: center;
        padding: 1rem;
        font-size: 0.7rem;
    }



</style>