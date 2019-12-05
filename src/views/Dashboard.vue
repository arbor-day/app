<template>
  <div id="dashboard">
    <section class="dashboard__titles">
      <h3>Tree Planting Opportunity Map</h3>
      <h3>Add trees to the map</h3>
    </section>
    <section class="dashboard__main">
    <!-- map view -->
    <MapView />
    <!-- table view -->
    <div class="table">
      <TodoForm />
      <TodoList />
    </div>
    </section>
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
  grid-template-rows: auto 1fr;
}

.dashboard__titles{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  text-align:left;
  h3{font-size:1rem;}
}

.dashboard__main{
  height: 100%;
  max-height: calc(100% - 3rem);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  // padding: 0 1rem;
}

.table{
  width:100%;
  height:100%;
  display: grid;
  grid-template-rows: 6rem calc(100vh - 11.25rem);
  grid-row-gap: 20px;
}
</style>
