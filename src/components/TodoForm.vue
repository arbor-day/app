<template>
  <div id="todo-form">
    <!-- <p>Add an entry</p> -->
    <form ref="submitForm" @submit.prevent="submitForm">
      <table>
        <thead>
          <th>Photo</th>
          <th>
            Address
            <button @click.prevent="getMapCenter">⌖</button>
          </th>
          <th>Latitude</th>
          <th>Longitude</th>
          <!-- <th>Status</th> -->
          <th>Description</th>
          <th>Submit</th>
        </thead>
        <tbody>
          <td>
            <input type="file" name="photo" @change="handleFileChange" />
            <!-- <p>not yet supported</p> -->
          </td>
          <td>
            <input type="text" name="address" v-model="form.address" />
          </td>
          <td>
            <input type="text" name="latitude" v-model="form.latitude" />
          </td>
          <td>
            <input type="text" name="longitude" v-model="form.longitude" />
          </td>
          <!-- <td>
            <div class="input-radio">
              <input type="radio" name="todoStatus" value="complete" />
              <label for="todo-complete">complete</label>
            </div>
            <div class="input-radio">
              <input type="radio" name="todoStatus" value="incomplete" />
              <label for="todo-incomplete">incomplete</label>
            </div>
          </td>-->
          <td>
            <input type="text" name="description" v-model="form.description" />
          </td>
          <td>
            <button>Submit</button>
          </td>
        </tbody>
      </table>

      <!--  -->
    </form>
  </div>
</template>

<script>
export default {
  name: "todo-form",
  data() {
    return {
      form: {
        photo: null,
        address: null,
        latitude: null,
        longitude: null,
        status: null,
        description: null
      }
    };
  },
  components: {},
  computed: {},
  methods: {
    handleFileChange(evt) {
      // this.photo = evt.target.files[0];
      console.log(evt.target.files[0])
      this.form.photo = evt.target.files[0];
    },
    submitForm() {
      // console.log(this.form);
      // const id =
      //   this.$store.state.todos.length > 0
      //     ? this.$store.state.todos[this.$store.state.todos.length - 1].id + 1
      //     : 0;
      const newForm = { ...this.form };
      this.$store.dispatch("addTodo", newForm);

      Object.keys(this.form).forEach(k => {
        this.form[k] = null;
      });
    },
    getMapCenter() {
      this.$store.commit("getMapCenter");
      this.form.longitude = this.$store.state.map.center.lng;
      this.form.latitude = this.$store.state.map.center.lat;
    }
  }
};
</script>

<style scoped lang="scss">
p {
  text-align: left;
}
form {
  // padding: 0.5rem;
  font-size: 0.7rem;
}

input {
  width: 100%;
}

table {
  border: 1px solid black;
  box-shadow: 4px 4px 0px black;
  th {
    // background-color:rgba(0,0,0,0.5);
    border-bottom: 1px solid black;
  }

  tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  td {
    padding: 0.4rem;
    font-size: 0.7rem;
  }
}
</style>
