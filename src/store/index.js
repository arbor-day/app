import Vue from 'vue';
import Vuex from 'vuex';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import * as turf from '@turf/turf';
// import todosArray from "../assets/sample.js";
import Router from '../router';

Vue.use(Vuex);

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default new Vuex.Store({
  state: {
    todos: [],
    geo: null,
    map: {
      center: null,
      zoom: null
    },
    user: {
      username: null,
      authd: false
    }
  },
  getters: {
    isAuthd: state => {
      return state.user.authd;
    },
    todos: state => {
      return state.todos;
    },
    todoMarkers: state => {
      const myPoints = turf.featureCollection(
        state.todos.map(item =>
          turf.point([item.longitude, item.latitude], {
            ...item
          })
        )
      );
      return myPoints;
    }
  },

  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },
    editTodo(state, updatedTodo) {
      state.todos = state.todos.map(item => {
        return item._id === updatedTodo._id ? updatedTodo : item;
      });
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(item => item._id !== id);
    },
    // map
    initMap(state, geo) {
      state.geo = geo;
    },
    addMapLayers(state) {
      state.geo.on('load', () => {
        state.geo.addSource('todo-locations', {
          type: 'geojson',
          data: this.getters.todoMarkers
        });

        state.geo.addLayer({
          id: 'todo-locations',
          type: 'circle',
          source: 'todo-locations',
          paint: {
            'circle-radius': 4,
            'circle-color': '#ff0000',
            'circle-stroke-color': '#ffff00'
          }
        });
      });
    },
    updatePoints(state) {
      if (state.geo !== null && state.geo.loaded()) {
        state.geo.getSource('todo-locations').setData(this.getters.todoMarkers);
      }
    },
    getMapCenter(state) {
      state.map.center = state.geo.getCenter();
    },
    // user
    setUsername(state, username) {
      state.user.username = username;
    },
    setAuthd(state, authState) {
      state.user.authd = authState;
    }
  },
  actions: {
    async getTodos(context) {
      try {
        let result = await fetch(`${API_BASE_URL}/api/v1/locations`);
        result = await result.json();

        context.commit('setTodos', result);
      } catch (error) {
        throw new Error(error);
      }
    },
    async addTodo(context, data) {
      // console.log("add todo");
      try {
        const dataCopy = Object.assign({}, data);

        if (dataCopy.photo !== null) {
          const photoOptions = {
            method: 'GET'
          };
          const encodedPhotoName = encodeURI(dataCopy.photo.name);
          const photoType = dataCopy.photo.type;

          let photoData = await fetch(
            `${API_BASE_URL}/moretrees-static/sign-s3?file-name=${encodedPhotoName}&file-type=${photoType}`,
            photoOptions
          );
          photoData = await photoData.json();

          const uploadOptions = {
            method: 'PUT',
            headers: {
              'Content-type': `${photoType}`
            },
            body: dataCopy.photo
          };

          await fetch(photoData.signedRequest, uploadOptions);
          dataCopy.photo = photoData.url;
        }

        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(dataCopy)
        };

        let result = await fetch(`${API_BASE_URL}/api/v1/locations`, options);
        result = await result.json();

        alert('successfully added!');
        context.commit('addTodo', result);
        context.commit('updatePoints');
      } catch (error) {
        alert('Uh-oh! Something went wrong. Sorry!');
        throw new Error(error);
      }
    },
    async editTodo(context, updatedTodo) {
      try {
        const id = updatedTodo._id;

        const options = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(updatedTodo)
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/locations/${id}`,
          options
        );
        result = await result.json();

        if (result.status === 'success') {
          alert('feature successfully updated');
          context.commit('editTodo', result.data);
          context.commit('updatePoints');
        } else {
          alert('error editing feature');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeTodo(context, id) {
      try {
        // console.log("remove todo");
        const options = {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
          // body: JSON.stringify(data)
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/locations/${id}`,
          options
        );
        result = await result.json();

        if (result.status === 'success') {
          alert('feature successfully deleted');
          context.commit('removeTodo', id);
          context.commit('updatePoints');
        } else {
          alert('error deleting feature');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async initMap(context, mapId) {
      mapboxgl.accessToken =
        'pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw';

      const map = new mapboxgl.Map({
        container: mapId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-73.975866, 40.676966], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });

      map.scrollZoom.disable();
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'bottom-right');

      context.commit('initMap', map);
      context.commit('addMapLayers');
    },
    // user
    async login(context, data) {
      try {
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(data)
        };

        let result = await fetch(`${API_BASE_URL}/api/v1/users/login`, options);

        result = await result.json();

        if (result.token) {
          alert('login successful');

          context.commit('setAuthd', true);
          context.commit('setUsername', result.user.username);

          Router.push({
            path: '/'
          });
        } else {
          alert('login unsuccesful');

          context.commit('setAuthd', false);
          context.commit('setUsername', null);

          Router.push({
            path: '/login'
          });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async register(context, data) {
      try {
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
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
          alert('signup successful');
          Router.push({ path: '/login' });
        } else {
          alert('signup unsuccesful');
          Router.push({ path: '/signup' });
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async forgotPassword(context, data) {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      };

      let result = await fetch(
        `${API_BASE_URL}/api/v1/users/auth/forgot_password`,
        options
      );

      result = await result.json();

      if (result.status === 'success') {
        alert(result.message);
      }
    },
    async resetPassword(context, data) {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      };

      let result = await fetch(
        `${API_BASE_URL}/api/v1/users/auth/reset_password`,
        options
      );

      result = await result.json();

      if (result.status === 'success') {
        Router.push({
          path: 'login'
        });
      } else {
        alert('password reset unsuccessful');
      }
    },
    async logout(context) {
      try {
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({})
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/users/me/logout`,
          options
        );
        result = await result.json();

        if (result.status === 'success') {
          context.commit('setUsername', null);
          context.commit('setAuthd', false);
          Router.push({
            path: '/'
          });
        } else {
          alert('logout incomplete / error occured!');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async checkAuth(context) {
      try {
        const options = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        };

        let result = await fetch(`${API_BASE_URL}/api/v1/users/me`, options);
        result = await result.json();

        if (result.status === 'success') {
          context.commit('setAuthd', true);
          context.commit('setUsername', result.username);
        } else {
          context.commit('setAuthd', false);
          context.commit('setUsername', null);
        }
      } catch (error) {
        // throw new Error(error);
        // console.log("not logged in");
        return;
      }
    }
  },
  modules: {}
});
