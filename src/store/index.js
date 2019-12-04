import Vue from "vue";
import Vuex from "vuex";

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
    ]
  },
  mutations: {
    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(item => item.id !== id);
    }
    // editTodo(state, todo){}
  },
  actions: {
    async addTodo(context, todo) {
      // console.log("add todo");
      context.commit("addTodo", todo);
    },
    async removeTodo(context, id) {
      // console.log("remove todo");
      context.commit("removeTodo", id);
    }
  },
  modules: {}
});
