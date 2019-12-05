import Vue from 'vue';
import Vuex from 'vuex';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import * as turf from '@turf/turf';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        photo: 'tree.jpg',
        address: '152 St Johns Place, Brooklyn, NY',
        latitude: 40.676966,
        longitude: -73.975866,
        status: 'incomplete',
        description: 'an empty spot on the sidewalk'
      }
    ]
  },
  getters:{
    todos: state => {
      return state.todos;
    },
    todoMarkers: state => {
      const myPoints = turf.featureCollection(
        state.todos.map(item =>
          turf.point([item.longitude, item.latitude], { ...item })
        )
      );
      return myPoints;
    }
  },

  mutations: {
    addTodo(state, todo) {
      state.todos = [...state.todos, todo];
    },
    removeTodo(state, id) {
      state.todos = state.todos.filter(item => item.id !== id);
    }

    // // editTodo(state, todo){}
    // initMap(state) {
    //   mapboxgl.accessToken =
    //     'pk.eyJ1Ijoiam9leWtsZWUiLCJhIjoiMlRDV2lCSSJ9.ZmGAJU54Pa-z8KvwoVXVBw';

    //   state.geo = new mapboxgl.Map({
    //     container: 'map-view',
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [-73.975866, 40.676966], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    //   });

    //   state.geo.on('load', function() {
    //     const myPoints = turf.featureCollection(
    //       state.todos.map(item =>
    //         turf.point([item.longitude, item.latitude], { ...item })
    //       )
    //     );

    //     state.geo.addSource('todo-locations', {
    //       type: 'geojson',
    //       data: myPoints
    //     });

    //     state.geo.addLayer({
    //       id: 'todo-locations',
    //       type: 'circle',
    //       source: 'todo-locations',
    //       paint: {
    //         'circle-radius': 10,
    //         'circle-color': '#ff0000'
    //       }
    //     });
    //   });
    // },

    // initLayers(state) {
    //   // Add a circle layer with a vector source.
    //   console.log('yo', state);
    // }
  },
  actions: {
    async addTodo(context, todo) {
      // console.log("add todo");
      context.commit('addTodo', todo);
    },
    async removeTodo(context, id) {
      // console.log("remove todo");
      context.commit('removeTodo', id);
    }
  },
  modules: {}
});
