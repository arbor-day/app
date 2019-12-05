<template>
  <div id="map-view"></div>
</template>

<script>

// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import * as turf from '@turf/turf';

export default {
  name: 'map-view',
  methods:{},
  mounted() {
    this.$store.commit('initMap', 'map-view');
  }
};
</script>

<style scoped>
#map-view {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  border: 1px solid black;
  box-shadow: 4px 4px 0px black;
}

</style>
