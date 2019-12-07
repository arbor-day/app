<template>
  <div id="login">
    <h1>login</h1>
    <div>
      <form @submit.prevent="submitForm">
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
          <button>Login</button>
        </div>
      </form>
    </div>
    <div>
      <p>
        Don't have an account yet?
        <router-link to="/signup">Register</router-link>to begin.
      </p>
    </div>
  </div>
</template>

<script>
import Router from '../router'; 
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

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify(data)
        };

        let result = await fetch(
          "http://localhost:3030/api/v1/users/login",
          options
        );
        
        result = await result.json();
        
        if(result.username){
          alert('login successful')
          Router.push({ path: 'home' })
        } else {
          alert('login unsuccesful')
          Router.push({ path: 'login' })
        }
        

      } catch (err) {
        throw new Error(err)
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>