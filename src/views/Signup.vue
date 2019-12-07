<template>
  <div id="register">
    <h1>Register</h1>
    <div>
      <form @submit.prevent="submitForm">
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
    </div>
    <div>
      <p>
        Already have an account?
        <router-link to="/login">Log in</router-link>.
      </p>
    </div>
  </div>
</template>

<script>
import Router from '../router'; 
export default {  
  name: "signup",
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

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          // credentials: 'include',
          body: JSON.stringify(data)
        };

        let result = await fetch(
          "http://localhost:3030/api/v1/users/register",
          options
        );
        
        result = await result.json();
        
        if(result.token){
          alert('signup successful')
          Router.push({ path: 'home' })
        } else {
          alert('signup unsuccesful')
          Router.push({ path: 'signup' })
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