import Vue from "vue";
import Vuex from "vuex";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import * as turf from "@turf/turf";
import todosArray from "../assets/sample.js";
import Router from "../router";

Vue.use(Vuex);

const BASE_URL = "http://localhost:3030";

export default new Vuex.Store({
  state: {
    todos: todosArray,
    geo: null,
    map: {
      center: null,
      zoom: null
    },
    user: {
      username: null,
      authd: false
    }
  },
  getters: {
    isAuthd: state => {
      return state.user.authd;
    },
    todos: state => {
      return state.todos;
    },
    todoMarkers: state => {
      const myPoints = turf.featureCollection(
        state.todos.map(item =>
          turf.point([item.longitude, item.latitude], {
            ...item
          })
        )
      );
      return myPoints;
    }
  },

  mutations: {
    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },
    editTodo(state, updatedTodo) {
      state.todos = state.todos.map(item => {
        return item.id === updatedTodo.id ? updatedTodo : item;
      });
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(item => item.id !== id);
    },
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
    },
    getMapCenter(state) {
      state.map.center = state.geo.getCenter();
    },
    // user
    setUsername(state, username) {
      state.user.username = username;
    },
    setAuthd(state, authState) {
      state.user.authd = authState;
    }
  },
  actions: {
    async addTodo(context, todo) {
      // console.log("add todo");
      context.commit("addTodo", todo);
      context.commit("updatePoints");
    },
    async editTodo(context, updatedTodo) {
      // console.log("add todo");
      context.commit("editTodo", updatedTodo);
      context.commit("updatePoints");
    },
    async removeTodo(context, id) {
      // console.log("remove todo");
      context.commit("removeTodo", id);
      context.commit("updatePoints");
    },
    async initMap(context, mapId) {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw";

      const map = new mapboxgl.Map({
        container: mapId,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-73.975866, 40.676966], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });

      context.commit("initMap", map);
      context.commit("addMapLayers");
    },
    // user
    async login(context, data) {
      try {
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        };

        let result = await fetch(`${BASE_URL}/api/v1/users/login`, options);

        result = await result.json();

        if (result.token) {
          alert("login successful");

          context.commit("setAuthd", true);
          context.commit("setUsername", result.user.username);

          Router.push({ path: "/" });
        } else {
          alert("login unsuccesful");

          context.commit("setAuthd", false);
          context.commit("setUsername", null);

          Router.push({ path: "/" });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async forgotPassword(context, data) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      };

      let result = await fetch(
        `${BASE_URL}/api/v1/users/auth/forgot_password`,
        options
      );

      result = await result.json();

      if (result.status === "success") {
        alert(result.message);
      }
    },
    async resetPassword(context, data) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      };

      let result = await fetch(
        `${BASE_URL}/api/v1/users/auth/reset_password`,
        options
      );

      result = await result.json();

      if (result.status === "success") {
        Router.push({ path: "login" });
      } else {
        alert("password reset unsuccessful");
      }
    },
    async logout(context) {
      try {
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({})
        };

        let result = await fetch(`${BASE_URL}/api/v1/users/me/logout`, options);
        result = await result.json();

        if (result.status === "success") {
          context.commit("setUsername", null);
          context.commit("setAuthd", false);
          Router.push({ path: "/" });
        } else {
          alert("logout incomplete / error occured!");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  modules: {}
});
