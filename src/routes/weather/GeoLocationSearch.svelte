<script>
    import { onMount } from "svelte";
    import { sample_seoul } from "./geoSamples";
    import { app } from './store.svelte';
    import { preload } from "$lib/client/util";
    
    let query = $state('');
    let geoURL = $derived(`https://geocoding-api.open-meteo.com/v1/search?name=${query}`);
    let currFlagUrl = $derived(getCountryFlagUrl(app.geoLocation?.country_code));

    /** @type { Array<GeoLocation> } */
    let geoResults = $state([]);
    let searching = $state(false);
    let loading = $state(false);
    let errorMessage = $derived.by(()=>{
        if (!query.trim() || query.length < 2)
            return 'Type at least 2 words';
        else
            return null;
    });


    let timer = 0;
    /** @param {KeyboardEvent} e */
    function handleKeypress(e) {

        loading = true;
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
        loading = false;
        if (res.ok) {
            const json = await res.json();
            return json.results;
        }
        else {
            console.error(res);
        }
    }

    /** @param {string|undefined} countryCode */
    function getCountryFlagUrl(countryCode) {
        return `https://flagcdn.com/${(countryCode??'').toLowerCase()}.svg`;
    }

    /** @param { GeoLocation } item */
    function handleClick(item) {
        app.geoLocation = item;
        console.log('app.geoLocation', app.geoLocation, item);
        console.log(app.geoLocation.latitude, app.geoLocation.longitude, app.geoLocation.country_code);
        searching = false;
        geoResults = [];
        query = '';
    }

    
    function toggleSearchBox() {
        searching = !searching;
        query = '';
        if (searching) {
            document.getElementById('x-search-field')?.focus();
        }
    }

    onMount(()=>{
        // TODO: remove caching
        query = 'seoul';
        geoResults = sample_seoul;
    })


const onImageLoad = function (el) {
    console.log(el)
}
</script>

<div>
    <div class:x-hidden={searching} class="x-current">
        {#await preload(currFlagUrl)}
        <div></div>
        {:then _}
        <img src={currFlagUrl} width="30" alt="{app.geoLocation?.country}">
        <div>
            <div>{app.geoLocation?.name}</div>
            <div>({app.geoLocation?.latitude}, {app.geoLocation?.longitude})</div>
        </div>
        {/await}
        <button class="x-trans" onclick={toggleSearchBox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5" />
            </svg>
        </button>
    </div>

    <div style="position: relative;" class:x-hidden={!searching}>
        <input id="x-search-field" type="text" bind:value={query} onkeypress={handleKeypress} >
        <button class="x-trans x-search-close" onclick={toggleSearchBox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512">
                <path fill="currentColor" d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z" />
            </svg>
        </button>
    </div>
    <div class="x-result">
        {#if query === ''}
        <!-- initialized -->
        {:else if errorMessage}
        <p class="x-error">{errorMessage}</p>
        {:else if loading}
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
    .x-current {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;
        
        &>:nth-child(2) {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
        }
    }

    .x-trans {
        color: currentColor;
        border: 0;
        background-color: transparent;
    }

    .x-search-close {
        position: absolute;
        right: 0;
    }

    .x-hidden {
        display: none;
    }
    
</style>