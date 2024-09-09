<script>
    import DevelopProgress from "./DevelopProgress.svelte";
    import GeoLocationSearch from "./GeoLocationSearch.svelte";
    import { onMount } from "svelte";
    import { app } from "./store.svelte";
    import Forcast from "./Forcast.svelte";



    onMount(()=>{
        // Get current geolocation with browsers API.
        navigator.geolocation && navigator.geolocation.getCurrentPosition(async geoPos=>{
            // geoPos.latitude
            // geoPos.longitude
            // geoPos.accuracy
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

        })
    })

</script>


<DevelopProgress />
<h1>Weather App</h1>
<div>
     
    <GeoLocationSearch />
     
    <Forcast />

</div>

<style>
    
</style>