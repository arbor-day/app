<template>
  <div id="dashboard">
    <!-- map view -->
    <MapView />

    <!-- table view -->
    <div class="table">
      <TodoForm />
      <TodoList />
    </div>
  </div>
</template>

<script>
import MapView from "@/components/MapView.vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";

export default {
  name: "dashboard",
  components: {
    MapView,
    TodoForm,
    TodoList
  }
};
</script>

<style scoped lang="scss">
#dashboard {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 20px;
  padding: 2rem;
}
</style>
