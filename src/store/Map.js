import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export default {
  state: {
    map: {
      center: null,
      zoom: null
    }
  },
  getters: {},
  mutations: {
    getMapCenter(state) {
      state.map.center = state.geo.getCenter();
    }
  },
  actions: {
    async initMap(context, mapId) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw";

      const map = new mapboxgl.Map({
        container: mapId,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-73.975866, 40.676966], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });

      map.scrollZoom.disable();
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");

      context.commit("initMap", map);
      context.commit("addMapLayers");
    }
  }
};
