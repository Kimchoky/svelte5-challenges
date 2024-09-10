<script>
    import { convertToFahrenheit, convertUTCToLocal, getFormattedDate } from "$lib/utils";
    import { app } from "./store.svelte";
    import WmoWeatherIcon from "./WmoWeatherIcon.svelte";

    let apiUrl = $derived.by(() => {
        if (app.geoLocation?.latitude) {
            const url = new URL('https://api.open-meteo.com/v1/forecast');
            url.searchParams.set('latitude', ''+app.geoLocation.latitude);
            url.searchParams.set('longitude', ''+app.geoLocation.longitude);
            url.searchParams.set('forecast_days', '7');
            url.searchParams.set('current', 'temperature_2m,weather_code');
            url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code');
            url.searchParams.set('timezone', 'auto');
            return url;
        }
        else
            return '';
    });

    /** @type { Forecast }*/
    let rawResult = $state({ current: { time: '', temperature_2m: null, weather_code: null }, hourly: {}});
    let temperatureUnit = $derived(app.temperatureUnit === 'f' ? '°F' : '°C');
    let current = $derived.by(() => {
        if (!rawResult.current) return { time: '', temperature_2m: null};
        return {
            time: rawResult.current?.time,
            temperature_2m:  (app.temperatureUnit === 'f') ? convertToFahrenheit(rawResult.current.temperature_2m) : rawResult.current.temperature_2m,
            weather_code: rawResult.current.weather_code,
        }
    });

    const getForecast = async function() {
        const result = await fetch(apiUrl)
        .then(r => r.json());
        rawResult = result;
        console.log(rawResult);
        return true;
    }

    $effect(()=>{
       
    })

</script>


<h1>Forecast</h1>

<div>
    <div>Temperature Unit : {app.temperatureUnit}</div>
</div>
{#if apiUrl}
{#await getForecast()}
    <div aria-busy="true">Loading...</div>
{:then _}
    {#if current}
    <div>
        {convertUTCToLocal(current.time).date} {convertUTCToLocal(current.time).time}
    </div>
    <div>
        UTC: {current.time} 
    </div>
    <div>
        <WmoWeatherIcon code={current.weather_code} />
    </div>
    <div>
        Temperature: {current.temperature_2m} {temperatureUnit}
    </div>
    {:else}
    <div>Cannot fetch current weather information</div>
    {/if}

{/await}
{/if}