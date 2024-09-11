<script>
    import { convertToFahrenheit, convertUTCToLocal, getFormattedDate } from "$lib/util";
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

    /** @param {number|null} celsius*/
    const derivedTemperature = function (celsius) {
        if (app.temperatureUnit === 'f')
            return convertToFahrenheit(celsius);
        else
            return celsius;
    }
    /** @type { Forecast }*/
    let rawResult = $state({ current: { time: '', temperature_2m: null, weather_code: -1 }, });
    let temperatureUnit = $derived(app.temperatureUnit === 'f' ? '°F' : '°C');
    let current = $derived.by(() => {
        if (!rawResult.current) return { time: '', temperature_2m: null, weather_code: -1};
        return {
            time: rawResult.current?.time,
            temperature_2m: derivedTemperature(rawResult.current.temperature_2m),
            weather_code: rawResult.current.weather_code,
        }
    });
    let daily = $derived.by(() => {
        if (!rawResult.daily?.time?.length) return [];
        return rawResult.daily.time.map((t, i) => ({
            time: t,
            min: derivedTemperature(rawResult.daily?.temperature_2m_min[i] ?? null), 
            max: derivedTemperature(rawResult.daily?.temperature_2m_max[i] ?? null),
            weather_code: rawResult.daily?.weather_code[i], 
        }));
    })

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


{#if apiUrl}
<div class="x-wrapper">
    <div class="x-current">
    {#await getForecast()}
        <div aria-busy="true">Loading...</div>
    {:then _}
        {#if current}
            <WmoWeatherIcon code={current.weather_code} width="100%" height="100%" />
            <div class="x-curr-time">
                <div>{convertUTCToLocal(current.time).date}</div>
                <div>{convertUTCToLocal(current.time).time}</div>
            </div>
            <div class="x-curr-temp">
                {current.temperature_2m} {temperatureUnit}
            </div>
        {:else}
            <div>Cannot fetch current weather information</div>
        {/if}
    {/await}
    </div>

    <div class="x-forecast">
        <h3>Forecast</h3>
        <ul class="container">
            {#each daily as d}
            <li class="">
                <div>{d.time}</div>
                <div><WmoWeatherIcon code={d.weather_code ?? -1} /></div>
                <div>
                    <div>max: {d.max} {temperatureUnit}</div>
                    <div>min: {d.min} {temperatureUnit}</div>
                </div>
            </li>
            {/each}
        </ul>
    </div>

</div>
{/if}

<style lang="scss">
    .x-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;

        @include desktop {
            flex-direction: row;
        }
    }
    .x-current {
        position: relative;
        justify-content: center;
        width: calc(100% - 10rem);

        .x-curr-time {
            position: absolute;
            top: 0;
            left: -5rem;
            font-weight: 600;
            color: light-dark(lightseagreen, bisque);
            
            @include desktop {
                left: 0;
                top: -50%;
            }
        }

        .x-curr-temp {
            position: absolute;
            top: 0;
            right: -5rem;
            font-weight: 900;
            font-size: 2rem;
            color: light-dark(lightseagreen, bisque);

            @include desktop {
                right: 0;
                top: -50%;
            }
        }

        .x-curr-time, .x-curr-temp {
        
        }


    }

    .x-forecast {
        width: 100%;
        
        ul {
            display: flex;
            flex-direction: column;
            padding: 0;

            li {
                list-style: none;
                display: flex;
                align-items: center;
                justify-content: space-between;
                // width: 75vw;
                padding: .5rem 1rem;
                gap: 1rem;
            }

            & > li:not(:last-child) {
                border-bottom: 1px solid currentColor;
            }
        }
    }
    


</style>