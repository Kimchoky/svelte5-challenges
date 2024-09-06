<script>
    import { onMount } from "svelte";
    import { sample_seoul } from "./geoSamples";

    
    /** @type { geoLocation: GeoLocation }*/
    let { geoLocation = $bindable({}) } = $props();

    let query = $state('');
    let geoURL = $derived(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);

    /** @type { Array<Geolocation> } */
    let geoResults = $state([]);
    
    let searching = $state(false);
    let errorMessage = $derived((()=>{
        if (!query.trim() || query.length < 2)
            return 'Type at least 2 words';
        else
            return null;
    })());


    let timer = null;
    function handleKeypress(e) {

        searching = true;
        clearTimeout(timer);

        timer = setTimeout(async () => {
            if (errorMessage) {
                clearTimeout(timer);
                return;
            }
            geoResults = await getGeoResults();
        }, 500);
    }

    async function getGeoResults() {   
        
        const res = await fetch(geoURL)
        searching = false;
        if (res.ok) {
            const json = await res.json();
            return json.results;
        }
        else {
            console.error(res);
        }
    }

    function getCountryFlagUrl(coutnryCode) {
        return `https://flagcdn.com/${(''+coutnryCode).toLowerCase()}.svg`;
    }

    /** @param { GeoLocation } item */
    function handleClick(item) {
        geoLocation = item;
        geoResults = [];
        query = '';
    }

    onMount(()=>{
        // TODO: remove caching
        query = 'seoul';
        geoResults = sample_seoul;
    })

</script>

<div>
    <input type="text" bind:value={query} onkeypress={handleKeypress} >
    <div class="x-result">
        {#if query === ''}
        <!-- initialized -->
        {:else if errorMessage}
        <p class="x-error">{errorMessage}</p>
        {:else if searching}
        <p> <span aria-busy="true">Loading...</span> </p>
        {:else if geoResults.length > 0}
        <ul>
            {#each geoResults as item, index (item.id)}
            <li class="x-flex-row" onclick={()=>{handleClick(item)}}>
                <div>
                    <img src="{getCountryFlagUrl(item.country_code)}" width="30" alt="{item.country}">
                </div>
                <div>{item.name}</div>
                <div>({item.latitude}, {item.longitude})</div>
            </li>
            {/each}
        </ul>        
        {:else if query.length > 0}
            <p>Nothing found</p>
        {/if}
    </div>
</div>


<style lang="scss">
    .x-result {
        position: relative;

        .x-error {
            color: red;
        }
    }

    ul {
        width: 100%;
        padding: 0;

        li {
            cursor: pointer;
            height: 3rem;
            padding: 1rem 2rem;
            list-style: none;
            border: 1px solid currentColor;
            border-radius: 5px;
            background-color: light-dark(var(--pico-color-slate-100), var(--pico-color-slate-700));
            gap: 2rem;

            &:hover {
                transform: scale(1.03);
                filter: brightness(1.2);
            }

            div:nth-of-type(2) {
                flex-grow: 1
            }
        }
    }
</style>