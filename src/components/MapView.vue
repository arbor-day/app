<template>
  <div id="map-view">
    <p>{{this.todos}}</p>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import * as turf from '@turf/turf';

export default {
  name: 'map-view',
  data(){
    return {
      geo: null,
    }
  },
  computed: {
    todos() {
      const myPoints = this.$store.getters.todoMarkers;
      
      if (this.geo !== null && this.geo.loaded()) {
        // console.log(myPoints);
        this.geo.getSource('todo-locations').setData(myPoints);
      }

      return myPoints
    }
  },
  methods:{
    initMap(){
      mapboxgl.accessToken =
        'pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw';

      this.geo = new mapboxgl.Map({
        container: 'map-view',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.975866, 40.676966], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });

      this.geo.on('load', ()=> {

        this.geo.addSource('todo-locations', {
          type: 'geojson',
          data: this.todos
        });

        this.geo.addLayer({
          id: 'todo-locations',
          type: 'circle',
          source: 'todo-locations',
          paint: {
            'circle-radius': 10,
            'circle-color': '#ff0000'
          }
        });
      });


    }
  },
  mounted() {
    this.initMap();
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
