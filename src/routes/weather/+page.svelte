<script>
    import DevelopProgress from "./DevelopProgress.svelte";
    import GeoLocationSearch from "./GeoLocationSearch.svelte";
    import { onMount } from "svelte";
    import { app } from "./store.svelte";
    import Forecast from "./Forecast.svelte";

    /** @type { {data:{ temperatureUnit:string, geoLocation: GeoLocation|null} }}*/
    const { data } = $props();
    let geoPosError = $state(false);
    app.temperatureUnit = data.temperatureUnit;
    app.geoLocation = data.geoLocation;

    onMount(()=>{
        if (!app.geoLocation) {
            console.log('Trying to get geolocation in browser')
            // Get current geolocation with browsers API.
            navigator.geolocation && navigator.geolocation.getCurrentPosition(async geoPos=>{
                geoPos.coords;
                
                // https://nominatim.org/release-docs/develop/api/Reverse/
                // for get current location with browers's geoLocation
                const reverseGeo = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${geoPos.coords.latitude}&lon=${geoPos.coords.longitude}&format=json&zoom=10&accept-language=en`)
                .then(r=>r.json())

                app.geoLocation = {
                    latitude: geoPos.coords.latitude,
                    longitude: geoPos.coords.longitude,
                    country_code: reverseGeo.address.country_code,
                    name: reverseGeo.address.city,   /* zoom must >= 10 */
                };

                document.cookie = `app:geoLocation=${JSON.stringify(app.geoLocation)};max-age=31536000;path=/`;

            }, (err) => {
                console.warn(err.message);
                geoPosError = true;
            })
        }
    })

    /** @type { import('svelte/elements').MouseEventHandler<HTMLInputElement> } */
    function switchUnit(e) {
        if (e.target instanceof HTMLInputElement && e.target.checked)
            app.temperatureUnit = 'f';
        else 
            app.temperatureUnit = 'c';
        
        document.cookie = `app:temperatureUnit=${app.temperatureUnit};max-age=31536000;path=/`;
    }



</script>

<DevelopProgress />

<h1>Weather App</h1>
<div class="x-right">
    <label>
        Celsius
        <input name="terms" type="checkbox" role="switch" onclick={switchUnit} checked={app.temperatureUnit === 'f'} />
        Fahrenheit
    </label>
</div>

<section>
    <GeoLocationSearch geoPosError={geoPosError} />
</section>

<section>
    <Forecast />
</section>

<style>
    section {
        padding: 1rem 0 0 0;
    }

    .x-right {
        display: flex;
        justify-content: flex-end;
    }
</style>