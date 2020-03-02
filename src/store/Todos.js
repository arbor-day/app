const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
export default {
  state: {
    todos: []
  },
  getters: {
    todos: state => {
      return state.todos;
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
    }
  },
  actions: {
    async getTodos(context) {
      try {
        let result = await fetch(`${API_BASE_URL}/api/v1/locations`);
        result = await result.json();

        context.commit("setTodos", result);
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
            method: "GET"
          };
          const encodedPhotoName = encodeURI(dataCopy.photo.name);
          const photoType = dataCopy.photo.type;

          let photoData = await fetch(
            `${API_BASE_URL}/moretrees-static/sign-s3?file-name=${encodedPhotoName}&file-type=${photoType}`,
            photoOptions
          );
          photoData = await photoData.json();

          const uploadOptions = {
            method: "PUT",
            headers: {
              "Content-type": `${photoType}`
            },
            body: dataCopy.photo
          };

          await fetch(photoData.signedRequest, uploadOptions);
          dataCopy.photo = photoData.url;
        }

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(dataCopy)
        };

        let result = await fetch(`${API_BASE_URL}/api/v1/locations`, options);
        result = await result.json();

        alert("successfully added!");
        context.commit("addTodo", result);
        context.commit("updatePoints");
      } catch (error) {
        alert(`Uh-oh! Something went wrong. ${JSON.stringify(error)}`);
        throw new Error(error);
      }
    },
    async editTodo(context, updatedTodo) {
      try {
        const id = updatedTodo._id;

        const options = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(updatedTodo)
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/locations/${id}`,
          options
        );
        result = await result.json();

        if (result.status === "success") {
          alert("feature successfully updated");
          context.commit("editTodo", result.data);
          context.commit("updatePoints");
        } else {
          alert("error editing feature");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async removeTodo(context, id) {
      try {
        // console.log("remove todo");
        const options = {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
          // body: JSON.stringify(data)
        };

        let result = await fetch(
          `${API_BASE_URL}/api/v1/locations/${id}`,
          options
        );
        result = await result.json();

        if (result.status === "success") {
          alert("feature successfully deleted");
          context.commit("removeTodo", id);
          context.commit("updatePoints");
        } else {
          alert("error deleting feature");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
