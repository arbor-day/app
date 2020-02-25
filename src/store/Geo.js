import * as turf from "@turf/turf";

export default {
  state: {
    geo: null
  },
  getters: {
    todoMarkers(state, getters, rootState) {
      const myPoints = turf.featureCollection(
        rootState.todos.todos.map(item =>
          turf.point([item.longitude, item.latitude], {
            ...item
          })
        )
      );
      return myPoints;
    }
  },
  mutations: {
    // map
    initMap(state, geo) {
      state.geo = geo;
    },
    addMapLayers(state) {
      state.geo.on("load", () => {
        state.geo.addSource("todo-locations", {
          type: "geojson",
          data: this.getters.todoMarkers
        });

        state.geo.addLayer({
          id: "todo-locations",
          type: "circle",
          source: "todo-locations",
          paint: {
            "circle-radius": 4,
            "circle-color": "#ff0000",
            "circle-stroke-color": "#ffff00"
          }
        });
      });
    },
    updatePoints(state) {
      if (state.geo !== null && state.geo.loaded()) {
        state.geo.getSource("todo-locations").setData(this.getters.todoMarkers);
      }
    }
  },
  actions: {}
};
