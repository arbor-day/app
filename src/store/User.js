import Router from "../router";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export default {
  state: {
    user: {
      username: null,
      authd: false
    }
  },
  getters: {
    isAuthd: state => {
      return state.user.authd;
    }
  },
  mutations: {
    // user
    setUsername(state, username) {
      state.user.username = username;
    },
    setAuthd(state, authState) {
      state.user.authd = authState;
    }
  },
  actions: {
    // user
    async login(context, data) {
      try {
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        };

        let result = await fetch(`${API_BASE_URL}/api/v1/users/login`, options);

        result = await result.json();

        if (result.token) {
          alert("login successful");

          context.commit("setAuthd", true);
          context.commit("setUsername", result.user.username);

          Router.push({
            path: "/"
          });
        } else {
          alert("login unsuccesful");

          context.commit("setAuthd", false);
          context.commit("setUsername", null);

          Router.push({
            path: "/login"
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async register(context, data) {
      try {
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          // credentials: 'include',
          body: JSON.stringify(data)
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/users/register`,
          options
        );

        result = await result.json();

        if (result.token) {
          alert("signup successful");
          Router.push({ path: "/login" });
        } else {
          alert("signup unsuccesful");
          Router.push({ path: "/signup" });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async forgotPassword(context, data) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      };

      let result = await fetch(
        `${API_BASE_URL}/api/v1/users/auth/forgot_password`,
        options
      );

      result = await result.json();

      if (result.status === "success") {
        alert(result.message);
      }
    },
    async resetPassword(context, data) {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      };

      let result = await fetch(
        `${API_BASE_URL}/api/v1/users/auth/reset_password`,
        options
      );

      result = await result.json();

      if (result.status === "success") {
        Router.push({
          path: "login"
        });
      } else {
        alert("password reset unsuccessful");
      }
    },
    async logout(context) {
      try {
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({})
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/users/me/logout`,
          options
        );
        result = await result.json();

        if (result.status === "success") {
          context.commit("setUsername", null);
          context.commit("setAuthd", false);
          Router.push({
            path: "/"
          });
        } else {
          alert("logout incomplete / error occured!");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async checkAuth(context) {
      try {
        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        };

        let result = await fetch(`${API_BASE_URL}/api/v1/users/me`, options);
        result = await result.json();

        if (result.status === "success") {
          context.commit("setAuthd", true);
          context.commit("setUsername", result.username);
        } else {
          context.commit("setAuthd", false);
          context.commit("setUsername", null);
        }
      } catch (error) {
        // throw new Error(error);
        // console.log("not logged in");
        return;
      }
    }
  }
};
