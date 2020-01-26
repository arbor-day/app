<template>
  <nav class="nav">
    <input class="nav__toggle" name="nav-toggle" type="checkbox" />
    <label class="nav__toggle-label" for="nav-toggle">
      <p class="nav__toggle-label-text">menu</p>
    </label>

    <menu class="nav__menu">
      <div @click="closeMenu" class="nav__links">
        <router-link class="nav__link" to="/">Home</router-link>
        <router-link class="nav__link" to="/about">About</router-link>
        <router-link class="nav__link" to="/submit">Submit</router-link>
      </div>

      <div @click="closeMenu" class="nav__links">
        <div class="nav__links--authd" v-if="isAuthd">
          <p>welcome {{ this.$store.state.user.username }}</p>
          |
          <button @click.prevent="logout">logout</button>
        </div>
        <router-link class="nav__link" v-else to="/login"
          >Login/Register</router-link
        >
      </div>

      <div @click="closeMenu" class="nav__links">
        <router-link class="nav__link" to="/dashboard">Dashboard</router-link>
      </div>
    </menu>
  </nav>
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
    },
    closeMenu() {
      document.querySelector(".nav__toggle").checked = false;
    }
  },
  mounted() {
    return this.$store.dispatch("checkAuth");
  }
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 6rem;
  // width: 100%;
  // background-color:pink;

  &__toggle {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 2000;
    width: 4rem;
    height: 4rem;
    opacity: 0;

    &:hover ~ &-label {
      color: #9eebcf;
      transform: translate(1px, 1px);
      box-shadow: 2px 2px black;
    }

    &:active ~ &-label {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px black;
    }

    &-label {
      z-index: 1999;
      position: absolute;
      top: 1rem;
      left: 1rem;
      height: 4rem;
      width: 4rem;
      border: 2px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: thin;
      transition: color 0.5s;
      background-color: white;
      box-shadow: 3px 3px black;
    }
  }

  &__toggle:checked ~ &__menu {
    display: flex;
  }

  &__menu {
    width: 100%;
    height: 100%;
    background-color: #9eebcf;
    position: fixed;
    top: 0rem;
    left: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  &__links {
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }

    @media screen and (max-width: 400px) {
      font-size: 0.8rem;
    }
  }

  &__link {
    margin-bottom: 1rem;
  }
  &__link:link,
  &__link:visited {
    color: black;
    text-decoration: none;
    text-align: center;
  }

  &__link:hover {
    color: white;
    text-decoration: underline;
  }

  &__links:not(:last-child) {
    margin-bottom: 2rem;
  }

  // display: flex;
  // justify-content: space-between;

  // .nav__logo {
  //   max-width: 300px;

  //   img {
  //     width: 100%;
  //   }
  // }

  // .nav__links--authd,
  // p {
  //   display: inline;
  //   font-weight: bold;
  //   color: #2c3e50;
  //   font-size: 0.8rem;
  //   text-decoration: none;

  //   button {
  //     margin: 0 1rem 0 0;
  //     background: none;
  //     border: none;
  //     color: #2c3e50;
  //     font-size: 0.8rem;
  //   }
  // }

  // a {
  //   font-weight: bold;
  //   color: #2c3e50;
  //   font-size: 0.8rem;
  //   text-decoration: none;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }

  // a:not(:last-child) {
  //   margin: 0 1rem 0 0;
  // }
}
</style>
