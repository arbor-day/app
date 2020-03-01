import Vue from "vue";
import Vuex from "vuex";

// import todosArray from "../assets/sample.js";
import GeoState from "./Geo";
import MapState from "./Map";
import TodosState from "./Todos";
import UserState from "./User";

Vue.use(Vuex);

// const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export default new Vuex.Store({
  modules: {
    todos: TodosState,
    geo: GeoState,
    map: MapState,
    users: UserState
  }
});
