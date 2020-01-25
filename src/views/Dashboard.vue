<template>
  <div id="dashboard">
    <section class="dashboard__main">
      <!-- table view -->
      <div class="dashboard__main-table">
        <TodoList />
      </div>
      <!-- map section -->
      <div class="dashboard__main-map">
        <!-- submission form -->
        <div class="dashboard__main-map-controls">
          <TodoForm />
        </div>
        <div class="dashboard__main-map-view">
          <!-- map view -->
          <MapView />
        </div>
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
  },
  mounted() {
    return this.$store.dispatch("getTodos");
  }
};
</script>

<style scoped lang="scss">
#dashboard {
  height: 100vh;
  width: 100%;
  padding: 6rem 0.2rem 1rem 0.2rem;
}

.dashboard__main {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  &-map {
    position: relative;
    width: 100%;
    height: 100%;

    &-controls {
      position: absolute;
      top: 0.2rem;
      left: 0;
      z-index: 1000;
      width: 100%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-view {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &-table {
    // padding:1rem;
    width: 100%;
    height: 100%;
  }
}

// .table {
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-rows: 6rem calc(100vh - 11.25rem);
//   grid-row-gap: 20px;
// }
</style>
