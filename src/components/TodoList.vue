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
      <tbody>
        <tr v-for="todo in this.todos" v-bind:key="todo.id">
          <td>{{todo.photo}}</td>
          <td>{{todo.address}}</td>
          <td>{{todo.latitude}}</td>
          <td>{{todo.longitude}}</td>
          <td>{{todo.status}}</td>
          <td>{{todo.description}}</td>
          <td>
            <button>edit</button>
            <button v-on:click="removeTodo(todo.id)">remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name:"todo-list",
  components:{

  },
  computed:{
    todos(){
      return this.$store.state.todos;
    }
  },
  methods:{
    removeTodo(id){
      return this.$store.dispatch('removeTodo', id);
    }
  }
}
</script>

<style scoped lang="scss">
table{
  border: 1px solid black;
  box-shadow: 4px 4px 0px black;

  th{
    // background-color:rgba(0,0,0,0.5);
    border-bottom:1px solid black;
  }

  tr:nth-child(odd){
    background-color:rgba(0,0,0, 0.1);
  }

  td{
    padding:0.4rem;
    font-size:0.7rem;
  }
}
</style>