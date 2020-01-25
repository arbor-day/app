<template>
  <div id="map-view"></div>
</template>

<script>
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import * as turf from '@turf/turf';
// mapview is structured
// based on https://stackoverflow.com/questions/41308177/how-to-setup-a-centralized-state-for-a-mapbox-map-in-vuex
export default {
  name: "map-view",
  methods: {},
  mounted() {
    this.$store.dispatch("initMap", "map-view");
  }
};
</script>

<style scoped lang="scss">
#map-view {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  border: 2px solid black;
  box-shadow: 4px 4px 0px black;
}
</style>
