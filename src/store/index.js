import Vue from "vue";
import Vuex from "vuex";
// import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
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
    // geo: null
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
    }
  },
  actions: {
    async addTodo(context, todo) {
      // console.log("add todo");
      context.commit("addTodo", todo);
      // context.commit("updatePoints");
    },
    async removeTodo(context, id) {
      // console.log("remove todo");
      context.commit("removeTodo", id);
      // context.commit("updatePoints");
    }
  },
  modules: {}
});
