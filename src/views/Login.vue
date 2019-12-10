<template>
  <div id="login">
    <div class="login-container">
      <h2 class="login__header">Login</h2>
      <form class="login__form" @submit.prevent="submitForm">
        <!--  -->
        <div>
          <label>email</label>
          <input type="email" name="email" v-model="email" />
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password" v-model="pass" />
          <router-link class="forgot-password" to="/reset_password"
            >forgot password</router-link
          >
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
      <p class="login__alt">
        Don't have an account yet?
        <router-link to="/register">Register</router-link> to begin.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: null,
      pass: null
    };
  },
  methods: {
    async submitForm() {
      try {
        const data = {
          email: this.email,
          password: this.pass
        };

        return this.$store.dispatch("login", data);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  width: 100%;
  height: 100%;

  .login-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .login__header {
      text-align: left;
      margin-bottom: 1rem;
    }

    .login__form {
      text-align: left;
      margin-bottom: 2rem;
      width: 100%;
      max-width: 320px;

      label {
        display: block;
      }

      input {
        padding: 0.5rem 1rem;
        display: block;
        width: 100%;
      }

      button {
        padding: 0.5rem 1rem;
        background-color: white;
        border: 1px solid black;
        box-shadow: 2px 2px 0px black;
        margin-top: 1.5rem;
      }

      .forgot-password {
        font-size: 0.8rem;
      }
    }

    .login__alt {
      font-size: 0.8rem;
    }
  }
}
</style>
