<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/Nav.vue";

export default {
  name: "app",
  components: {
    navbar
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  // height: 100%;
}

body {
  width: 100%;
  // height: 100%;
  font-size: 62.5%;
}

#app {
  display: grid;
  grid-template-rows: 1fr;
  font-family: "merriweather", "serif", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-view{
  margin-top: 6rem;
}
</style>
