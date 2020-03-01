<template>
  <div id="reset-password">
    <div v-if="hasResetToken" class="reset-password-container">
      <h2 class="reset-password__header">Submit a New Password</h2>
      <form class="reset-password__form" @submit.prevent="submitNewPassword">
        <!--  -->
        <div>
          <label for="newPassword">new password</label>
          <input type="password" name="newPassword" v-model="newPassword" />
        </div>
        <!--  -->
        <div>
          <label for="verifyPassword">verify password</label>
          <input
            type="password"
            name="verifyPassword"
            v-model="verifyPassword"
          />
        </div>

        <!--  -->
        <div>
          <label for="token">reset token</label>
          <input type="text" name="token" v-model="resetToken" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
    <div v-else class="reset-password-container">
      <h2 class="reset-password__header">Reset Password</h2>
      <!-- <p class="reset-password__text">Forgot your password? No worries.</p> -->
      <form class="reset-password__form" @submit.prevent="submitEmail">
        <label>email</label>
        <input type="email" name="email" v-model="email" />
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "reset-password",
  data() {
    return {
      verifyPassword: null,
      newPassword: null,
      email: null
    };
  },
  computed: {
    hasResetToken() {
      if (this.$route.query.token) {
        return true;
      } else {
        return false;
      }
    },
    resetToken() {
      return this.$route.query.token;
    }
  },
  methods: {
    submitEmail() {
      const data = {
        email: this.email
      };
      this.$store.users.dispatch("forgotPassword", data);
    },

    submitNewPassword() {
      const data = {
        token: this.resetToken,
        verifyPassword: this.verifyPassword,
        newPassword: this.newPassword
      };

      this.$store.users.dispatch("resetPassword", data);
    }
  }
};
</script>

<style scoped lang="scss">
#reset-password {
  width: 100%;
  height: 100%;

  .reset-password-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .reset-password__header {
      text-align: left;

      margin-bottom: 1rem;
    }
    .reset-password__text {
      margin-bottom: 1rem;
      text-align: left;
    }

    .reset-password__form {
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
