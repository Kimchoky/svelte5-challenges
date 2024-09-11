<script>
    
    import { picoTheme } from "$lib/store/theme";

    function togglePicoTheme() {
        $picoTheme = $picoTheme === 'light' ? 'dark' : 'light';
    }

</script>

<div class="x-flex-row">
    <a class="x-no-line" href="/"><span>Coding Challenges</span></a>
    
    <div class="media-checker">😀</div>

    <div class="x-flex-row x-f-right">
        <a class="x-no-line" href="/list"><span>List</span></a>
        <a class="outline" onclick={togglePicoTheme} href="#">
            {#if $picoTheme === 'light'}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="#ffc639" d="m260.622 42.537l58.117-39.696c3.641-2.487 8.643-1.147 10.552 2.828l30.483 63.437a7.2 7.2 0 0 0 7.035 4.062l70.179-5.32c4.397-.333 8.058 3.328 7.725 7.725l-5.32 70.179a7.2 7.2 0 0 0 4.062 7.035l63.437 30.483c3.975 1.91 5.315 6.911 2.828 10.552l-39.696 58.117a7.2 7.2 0 0 0 0 8.123l39.696 58.117c2.487 3.641 1.147 8.643-2.828 10.552l-63.437 30.483a7.2 7.2 0 0 0-4.062 7.035l5.32 70.179c.333 4.397-3.328 8.058-7.725 7.725l-70.179-5.32a7.2 7.2 0 0 0-7.035 4.062l-30.483 63.437c-1.91 3.975-6.911 5.315-10.552 2.828l-58.117-39.696a7.2 7.2 0 0 0-8.123 0l-58.117 39.696c-3.641 2.487-8.643 1.147-10.552-2.828l-30.483-63.437a7.2 7.2 0 0 0-7.035-4.062l-70.179 5.32c-4.397.333-8.058-3.328-7.725-7.725l5.32-70.179a7.2 7.2 0 0 0-4.062-7.035L6.228 328.731c-3.975-1.91-5.315-6.911-2.828-10.552l39.696-58.117a7.2 7.2 0 0 0 0-8.123L3.401 193.821c-2.487-3.641-1.147-8.643 2.828-10.552l63.437-30.483a7.2 7.2 0 0 0 4.062-7.035l-5.32-70.179c-.333-4.397 3.328-8.058 7.725-7.725l70.179 5.32a7.2 7.2 0 0 0 7.035-4.062L183.83 5.668c1.91-3.975 6.911-5.315 10.552-2.828l58.117 39.696a7.2 7.2 0 0 0 8.123.001" />
                <circle cx="256.56" cy="256" r="194.415" fill="#ffe564" />
            </svg>
            {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="#fde364" d="M503.851 210.204C492.563 120.657 434.38 44.485 355.192 7.235c-11.279-5.306-22.337 7.572-15.47 17.982c18.48 28.029 30.919 60.278 35.273 94.838c18.733 148.659-106.281 273.673-254.94 254.94c-34.56-4.354-66.81-16.793-94.839-35.273c-10.41-6.866-23.287 4.191-17.982 15.478c37.25 79.182 113.422 137.364 202.969 148.651c171.226 21.579 315.226-122.414 293.648-293.647" />
            </svg>
            {/if}
        </a>
    </div>
</div>

<style lang="scss">
    .x-flex-row {
        height: 3rem;
        padding: 1rem;
        font-size: 1.2rem;

        .x-f-right {
            font-size: 1rem;
            gap: 1rem;
        }
    }

    a.x-no-line {
        color: currentColor;
        font-weight: 600;
    }

    .media-checker {
        display: none;
        
        background-color: green;
        color: white;
        &:after { content: 'mobile'; }

        @include tablet {
            background-color: violet;
            &:after { content: 'tablet'; }
        }
        @include desktop {
            background-color: coral;
            &:after { content: 'desktop'; }
        }
    }
</style>