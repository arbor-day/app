<template>
  <div id="nav">
    <div class="nav__logo">
      <router-link to="/">Everyday, Arbor Day</router-link>
    </div>

    <div class="nav__links">
      <div class="nav__links--authd" v-if="isAuthd">
        <p>welcome {{ this.$store.state.user.username }}</p>
        |
        <button @click.prevent="logout">logout</button>
      </div>
      <router-link v-else to="/login">Login/Register</router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/submit">Submit</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    isAuthd() {
      return this.$store.getters.isAuthd;
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch("logout");
    }
  },
  mounted() {
    return this.$store.dispatch("checkAuth");
  }
};
</script>

<style lang="scss" scoped>
#nav {
  // padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;

  .nav__logo {
    margin-right: 2rem;
  }

  .nav__links--authd,
  p {
    display: inline;
    font-weight: bold;
    color: #2c3e50;
    font-size: 0.8rem;
    text-decoration: none;

    button {
      margin: 0 1rem 0 0;
      background: none;
      border: none;
      color: #2c3e50;
      font-size: 0.8rem;
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 0.8rem;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  a:not(:last-child) {
    margin: 0 1rem 0 0;
  }
}
</style>
