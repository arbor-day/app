<template>
  <div id="submit">
    <!-- quick -->
    <div class="submit__quick">
      <!-- canvas -->
      <img src="#" alt="image-placeholder" id="photoData" />
      <button class="upload-btn" @click="selectFile">📷</button>
      <!-- form -->
      <div class="form-group">
        <form class="submit__form">
          <section class="submit__form-row">
            <fieldset class="submit__form-fieldset">
              <legend class="submit__form-input-label" for="location">
                locate
              </legend>
              <button @click.prevent="getLocation" class="get-location-btn">
                ⊕
              </button>
            </fieldset>
            <fieldset class="submit__form-fieldset">
              <legend class="submit__form-input-label" for="latitude">
                lat.
              </legend>
              <input
                type="text"
                name="latitude"
                v-model="latitude"
                class="submit__form-input"
              />
            </fieldset>
            <fieldset class="submit__form-fieldset">
              <legend class="submit__form-input-label" for="longitude">
                lon.
              </legend>
              <input
                type="text"
                name="longitude"
                v-model="longitude"
                class="submit__form-input"
              />
            </fieldset>
          </section>
          <input
            type="file"
            name="photofile"
            class="submit__form-input-file"
            id="file-upload"
            @change="handleFileSelection"
          />
          <section class="submit__form-row">
          <fieldset class="submit__form-fieldset">
            <legend class="submit__form-input-label" for="description">description</legend>
            <input class="submit__form-input" type="text" name="description" v-model="description" />
          </fieldset>
          </section>
        </form>
        <section class="submit__form-row submit__form-row--submit">
          <button class="submit__form-btn" @click.prevent="submitForm">Submit</button>
          <button class="submit__form-new-btn" @click="resetToCamera">
            ➕
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// const P5 = require("p5");
export default {
  name: "submit",
  data() {
    return {
      latitude: null,
      longitude: null,
      description: "an empty tree bed",
      photoData: null,
      myP5: null
    };
  },
  computed: {},
  methods: {
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
          if (position) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          } else {
            alert("geo location is not available or turned off");
          }
        }, this.showError);
      }
    },
    submitForm() {
      if (this.photoData) {
        const data = {
          latitude: this.latitude,
          longitude: this.longitude,
          description: this.description,
          photo: this.photoData
        };
        this.$store.dispatch("addTodo", data);
        this.photoData = null;
      }
    },
    selectFile() {
      const $fileUpload = document.querySelector("#file-upload");
      $fileUpload.click();
    },
    handleFileSelection(evt) {
      const selectedImage = evt.target.files[0];
      this.photoData = selectedImage;
      const $photo = document.querySelector("#photoData");
      const reader = new FileReader();

      reader.onload = function(e) {
        $photo.src = e.target.result;
        $photo.style.display = "block";
      };

      reader.readAsDataURL(selectedImage);
    },
    resetToCamera() {
      const $photo = document.querySelector("#photoData");
      $photo.style.display = "none";
      this.photoData = null;
      this.selectFile();
    }
  },
  mounted() {
    this.getLocation();
  }
};
</script>

<style scoped lang="scss">
#submit {
  width: 100%;
  height: 100vh;
  background-color: #eee;
}

#photoData {
  display: none;
  width: 100%;
  height: 100%;
  max-width: 320px;
  z-index: 9999;
}



.submit__quick {
  width: 100%;
  height: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;

  .upload-btn {
      position:absolute;
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      font-size: 0.5rem;
      font-size:4rem;
      background-color: yellow;
      border:6px solid white;
    }


  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgba(#00326F, 0.25);
    position: absolute;
    bottom: 1rem;
    left: 0;
    z-index: 9999;
    border:2px solid black;
    border-radius:4px;
    box-shadow:4px 4px 0 black;
  }

  .submit__form {
    label {
      display: block;
      text-align: left;
    }

    &-btn {
      background-color:#00FD89;
      color: black;
      font-size: 0.8rem;
      border:4px solid white;
      padding: 0.1rem 1rem;
      letter-spacing: 0.25ch;
      border-radius:4px;
      height: 48px;
      position: relative;
      transition: background-color 0.5s;
      display: inline-block;
    }


    &-flip-btn {
      width: 48px;
      height: 48px;
      opacity: 0;
    }
    &-new-btn {
      width: 48px;
      height: 48px;
      background-color:yellow;
      border-radius: 50%;
      border:4px solid white;
      color:black;
    }

    &-row {
      display: flex;
      width: 100%;
      padding: 0.1rem 0.5rem;

      &--submit {
        align-items: center;
        justify-content: space-around;
        height: auto;
        padding:0.5rem;
      }
    }

    &-fieldset {
      padding: 0.1rem;
      flex-grow: 1;
      border: none;
    }

    &-input-label {
      padding: 0 0.2rem;
      color: white;
      text-align: left;
    }
    &-input {
      padding: 0.5rem;
      border: 0;
      outline: 0;
      background-color: #eee;
      width: 100%;
      z-index: 9999;
      height: 1.6rem;
      border-radius:2px;
    }
    &-input-file {
      display: none;
    }
  }
}

.get-location-btn {
  width: 1.6rem;
  height: 1.6rem;
  background-color: white;
  border: none;
}
</style>
