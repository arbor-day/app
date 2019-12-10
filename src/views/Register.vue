<template>
  <div id="register">
    <div class="register-container">
      <h2 class="register__header">Register</h2>
      <form class="register__form" @submit.prevent="submitForm">
        <!--  -->
        <div>
          <label>username</label>
          <input type="text" name="username" v-model="username" />
        </div>
        <!--  -->
        <div>
          <label>email</label>
          <input type="email" name="email" v-model="email" />
        </div>
        <div>
          <label>password</label>
          <input type="password" name="password" v-model="pass" />
        </div>
        <div>
          <button>register</button>
        </div>
      </form>
      <p class="register__alt">
        Already have an account?
        <router-link to="/login">Log in</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      username: null,
      email: null,
      pass: null
    };
  },
  methods: {
    async submitForm() {
      try {
        const data = {
          username: this.username,
          email: this.email,
          password: this.pass
        };

        return this.$store.dispatch("register", data);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
#register {
  width: 100%;
  height: 100%;

  .register-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .register__header {
      text-align: left;
      margin-bottom: 1rem;
    }

    .register__form {
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

    .register__alt {
      font-size: 0.8rem;
    }
  }
}
</style>
