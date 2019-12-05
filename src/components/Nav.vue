<template>
  <div id="nav">
    <div class="nav__logo">
      <router-link to="/">🌳</router-link>  
    </div>
    <div class="nav__links">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar"
};
</script>

<style lang="scss" scoped>
#nav {
  // padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;

  .nav__logo{
    margin-right:2rem;    
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size:0.8rem;
    text-decoration:none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  a:not(:last-child){
    margin: 0 1rem 0 0;
  }
}
</style>
