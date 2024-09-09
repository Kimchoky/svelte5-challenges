<script>
    import { app } from "./store.svelte";

    let { data } = $props();

    let tempUnit = $derived(app.temperatureUnit === 'f' ? 'temperature_unit=fahrenheit' : '');

    let apiUrl = $derived.by(()=> {
        if (app.geoLocation?.latitude)
            return `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${app.geoLocation?.latitude}&longitude=${app.geoLocation?.longitude}&start_date=2024-08-25&end_date=2024-09-07&hourly=temperature_2m`
        else
            return '';
    });

    const getForecast = async function() {
        const json = await fetch(apiUrl)
        .then(r => r.json());
        console.log(json);

        return json;
    }


</script>


<h1>Forecast</h1>

<div>
    <div>Temperature Unit : {app.temperatureUnit}</div>
</div>
{#if apiUrl}
{#await getForecast()}
    <div>Loading...</div>
{:then result}
    <div>
        
    </div>
{/await}
{/if}