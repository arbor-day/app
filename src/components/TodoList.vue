<template>
  <div id="todo-list">
    <table>
      <thead>
        <th>Photo</th>
        <th>Address</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Status</th>
        <th>Description</th>
        <th>Actions</th>
      </thead>
      <tbody v-if="this.todos.length > 0">

        <tr v-for="todo in this.todos" v-bind:key="todo._id">
          <!--  -->
          <td v-if="editing === todo._id">
            <input type="file" />
          </td>
          <td v-else>{{ todo.photo }}</td>
          <!--  -->
          <td v-if="editing === todo._id">
            <input type="text" name="address" v-model="todo.address" />
          </td>
          <td v-else>{{ todo.address }}</td>
          <!--  -->
          <td v-if="editing === todo.id">
            <input type="text" name="latitude" v-model="todo.latitude" />
          </td>
          <td v-else>{{ todo.latitude }}</td>
          <!--  -->
          <td v-if="editing === todo._id">
            <input type="text" name="longitude" v-model="todo.longitude" />
          </td>
          <td v-else>{{ todo.longitude }}</td>

          <td>{{ todo.status }}</td>
          <!--  -->
          <td v-if="editing === todo._id">
            <input type="text" name="description" v-model="todo.description" />
          </td>
          <td v-else>{{ todo.description }}</td>
          <!--  -->
          <td v-if="editing === todo._id">
            <button v-on:click="editTodo(todo)">save</button>
            <button v-on:click="cancelEdit(todo)">cancel</button>
            <button v-on:click="markComplete(todo)">done</button>
          </td>
          <td v-else>
            <button v-on:click="editMode(todo)">edit</button>
            <button v-on:click="removeTodo(todo._id)">remove</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7">No entries</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "todo-list",
  components: {},
  data() {
    return {
      editing: null,
      cachedTodo: null
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    }
  },
  methods: {
    editMode(todo) {
      this.cachedTodo = Object.assign({}, todo);
      this.editing = todo._id;
    },
    editTodo(todo) {
      this.$store.dispatch("editTodo", todo);
      this.editing = null;
    },
    cancelEdit(todo) {
      Object.assign(todo, this.cachedTodo);
      this.editing = null;
    },
    markComplete(todo){
      const newTodo = {...todo, status:'complete'}
      this.$store.dispatch("editTodo", newTodo);
      this.editing = null;
    },
    removeTodo(id) {
      return this.$store.dispatch("removeTodo", id);
    }
  }
};
</script>

<style scoped lang="scss">
#todo-list {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  border: 1px solid black;
  box-shadow: 4px 4px 0px black;
}
table {
  table-layout: fixed;
  width: 100%;
  height: 100%;
  

  th {
    border-bottom: 1px solid black;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  td {
    padding: 0.4rem;
    font-size: 0.6rem;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
}
input {
  width: 100%;
}
</style>
