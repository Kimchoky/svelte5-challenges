<script>
    import DevelopProgress from "./DevelopProgress.svelte";
    import GeoLocationSearch from "./GeoLocationSearch.svelte";

    /** @type { GeoLocation } */
    let geoLocation = $state({});


</script>


<DevelopProgress />
<h1>Weather App</h1>
<div>
     {geoLocation.name}
     <GeoLocationSearch bind:geoLocation />
     
</div>