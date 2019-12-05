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
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  padding: 1rem;
}

.table{
  width:100%;
  height:100%;
  display: grid;
  grid-template-rows: 6rem calc(100vh - 11.25rem);
  grid-row-gap: 20px;
}
</style>
