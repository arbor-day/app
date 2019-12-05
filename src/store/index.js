import Vue from "vue";
import Vuex from "vuex";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import * as turf from "@turf/turf";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        photo: "tree.jpg",
        address: "152 St Johns Place, Brooklyn, NY",
        latitude: 40.676966,
        longitude: -73.975866,
        status: "incomplete",
        description: "an empty spot on the sidewalk"
      }
    ],
    geo: null
  },
  getters: {
    todos: state => {
      return state.todos;
    },
    todoMarkers: state => {
      const myPoints = turf.featureCollection(
        state.todos.map(item =>
          turf.point([item.longitude, item.latitude], { ...item })
        )
      );
      return myPoints;
    }
  },

  mutations: {
    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(item => item.id !== id);
    },
    initMap(state, mapId) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw";

      state.geo = new mapboxgl.Map({
        container: mapId,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-73.975866, 40.676966], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });

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
            "circle-radius": 10,
            "circle-color": "#ff0000"
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
  actions: {
    async addTodo(context, todo) {
      // console.log("add todo");
      context.commit("addTodo", todo);
      context.commit("updatePoints");
    },
    async removeTodo(context, id) {
      // console.log("remove todo");
      context.commit("removeTodo", id);
      context.commit("updatePoints");
    }
  },
  modules: {}
});
