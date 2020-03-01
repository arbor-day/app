<template>
  <div id="submit">
    <!-- quick -->
    <div class="submit__quick">
      <!-- canvas -->
      <img src="#" alt="image-placeholder" id="photoData" />
      <div id="myCanvas"></div>
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
          <!-- <section class="submit__form-row">
          <fieldset class="submit__form-fieldset">
            <legend class="submit__form-input-label" for="description">description</legend>
            <input class="submit__form-input" type="text" name="description" v-model="description" />
          </fieldset>
          </section>-->
        </form>
        <section class="submit__form-row submit__form-row--submit">
          <button class="submit__form-upload-btn" @click="selectFile">
            photos
          </button>
          <button class="submit__form-btn" @click.prevent="submitForm"></button>
          <button class="submit__form-new-btn" @click="resetToCamera">
            📷
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const P5 = require("p5");
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
    // async getVideo() {
    //   let stream;
    //   try {
    //     stream = await navigator.mediaDevices.getUserMedia({
    //       video: true
    //     });

    //     this.videoElement.srcObject = stream;
    //     this.videoElement.play();

    //     // canvas
    //     const canvas = this.$refs.mycanvas;
    //     const ctx = canvas.getContext("2d");

    //     const renderVideoToCanvas = () => {
    //       window.requestAnimationFrame(renderVideoToCanvas);
    //       ctx.drawImage(
    //         this.videoElement,
    //         0,
    //         0,
    //         this.videoElement.width,
    //         this.videoElement.height
    //       );
    //     };

    //     window.requestAnimationFrame(renderVideoToCanvas);
    //   } catch (err) {
    //     return err;
    //   }
    // },
    submitForm() {
      if (this.photoData) {
        const data = {
          latitude: this.latitude,
          longitude: this.longitude,
          description: this.description,
          photo: this.photoData
        };
        this.$store.dispatch("addTodo", data);
      } else {
        document.querySelector("#defaultCanvas0").toBlob(
          blob => {
            const photoData = blob;
            photoData.name = `${Date.now()}.jpg`;

            const data = {
              latitude: this.latitude,
              longitude: this.longitude,
              description: this.description,
              photo: photoData
            };

            this.$store.dispatch("addTodo", data);
          },
          "image/jpeg",
          0.95
        );
      }
      this.photoData = null;
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
    }
  },
  mounted() {
    // this.getVideo();
    this.getLocation();

    const makeP5 = () => {
      const $myCanvas = document.querySelector("#myCanvas");
      const script = function(sketch) {
        let video;

        // NOTE: Set up is here
        sketch.setup = () => {
          sketch.createCanvas($myCanvas.clientWidth, $myCanvas.clientHeight);

          const videoOptions = {
            audio: false,
            video: {
              width: $myCanvas.clientWidth,
              height: $myCanvas.clientHeight,
              facingMode: "user"
            }
          };
          video = sketch.createCapture(videoOptions);
          video.hide();
          // video.size(360, 270);
        };
        sketch.draw = () => {
          sketch.background(0);
          if (video.loadedmetadata) {
            sketch.image(video, 0, 0, sketch.width, sketch.height);
          }
        };
      }; // NOTE: Use p5 as an instance mode
      return new P5(script, $myCanvas);
    };
    this.myP5 = makeP5();
  }
};
</script>

<style scoped lang="scss">
#submit {
  width: 100%;
  height: 100vh;
  background-color: black;
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

  #myCanvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 9999;
  }

  .submit__form {
    label {
      display: block;
      text-align: left;
    }

    &-btn {
      content: "";
      background-color: #eee;
      color: white;
      font-size: 1.5rem;
      border: 4px solid black;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      position: relative;
      transition: background-color 0.5s;
      display: inline-block;
    }

    &-btn:hover {
      background-color: green;
    }

    &-btn::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 68px;
      height: 68px;
      border-radius: 50%;
      z-index: -1;
      background-color: white;
      transform: translate(-50%, -50%);
    }

    &-upload-btn {
      width: 48px;
      height: 48px;
      border-radius: 4px;
      font-size: 0.5rem;
    }

    &-flip-btn {
      width: 48px;
      height: 48px;
      opacity: 0;
    }
    &-new-btn {
      width: 48px;
      height: 48px;
      background: none;
      border-radius: 4px;
    }

    &-row {
      display: flex;
      width: 100%;
      padding: 0.25rem 0.5rem;

      &--submit {
        align-items: center;
        justify-content: space-around;
        height: 6rem;
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
