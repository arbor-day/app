<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/dashboard">Dashboard</router-link>
  </div>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 0.5rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
