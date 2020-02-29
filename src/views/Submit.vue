<template>
  <div id="submit">
    <!-- quick -->
    <div class="submit__quick">
      <!-- canvas -->
      <div id="myCanvas"></div>
      <!-- form -->
      <form @submit.prevent="submitForm" class="submit__form">
        <section class="submit__form-row">
          <fieldset class="submit__form-fieldset">
            <legend class="submit__form-input-label" for="location">locate</legend>
            <button @click.prevent="getLocation" class="get-location-btn">⊕</button>
          </fieldset>
          <fieldset class="submit__form-fieldset">
            <legend class="submit__form-input-label" for="latitude">lat.</legend>
            <input type="text" name="latitude" v-model="latitude" class="submit__form-input" />
          </fieldset>
          <fieldset class="submit__form-fieldset">
            <legend class="submit__form-input-label" for="longitude">lon.</legend>
            <input type="text" name="longitude" v-model="longitude" class="submit__form-input" />
          </fieldset>
        </section>

        <section class="submit__form-row">
          <fieldset class="submit__form-fieldset">
            <legend class="submit__form-input-label" for="description">description</legend>
            <input class="submit__form-input" type="text" name="description" v-model="description" />
          </fieldset>
        </section>

        <section class="submit__form-row">
          <button class="submit__form-btn">submit!</button>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
const P5 = require("p5");
export default {
  name: "submit",
  data() {
    return {
      videoSrc: null,
      latitude: null,
      longitude: null,
      description: "an empty tree bed"
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
    async getVideo() {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        this.videoElement.srcObject = stream;
        this.videoElement.play();

        // canvas
        const canvas = this.$refs.mycanvas;
        const ctx = canvas.getContext("2d");

        const renderVideoToCanvas = () => {
          window.requestAnimationFrame(renderVideoToCanvas);
          ctx.drawImage(
            this.videoElement,
            0,
            0,
            this.videoElement.width,
            this.videoElement.height
          );
        };

        window.requestAnimationFrame(renderVideoToCanvas);
      } catch (err) {
        return err;
      }
    },
    submitForm() {
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
  },
  mounted() {
    // this.getVideo();
    this.getLocation();

    const makeP5 = () => {
      const script = function(sketch) {
        let video;
        const videoOptions = {
          audio: false,
          video: {
            width: { min: 360, ideal: 360, max: 360 },
            height: { min: 270, ideal: 270, max: 270 },
            facingMode: {
              exact: "environment"
            }
          }
        };

        // NOTE: Set up is here
        sketch.setup = () => {
          sketch.createCanvas(360, 270);
          video = sketch.createCapture(videoOptions);
          video.hide();
          // video.size(360, 270);
        };
        sketch.draw = () => {
          sketch.background(0);
          sketch.image(video, 0, 0, sketch.width, sketch.height);
        };
      }; // NOTE: Use p5 as an instance mode
      new P5(script, document.querySelector("#myCanvas"));
    };
    makeP5();
  }
};
</script>

<style scoped lang="scss">
#submit {
  width: 100%;
  height: 100vh;
}
.submit__quick {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .submit__form {
    display: flex;
    flex-direction: column;
    max-width: 320px;

    label {
      display: block;
      text-align: left;
    }

    &-btn {
      display: block;
      padding: 1rem;
      background-color: #27ae60;
      color: white;
      font-size: 1.5rem;
      border: none;
      box-shadow: 4px 4px 0px black;
      margin: 1rem auto;
    }

    &-row {
      display: flex;
      width: 100%;
    }

    &-fieldset {
      padding: 0.5rem;
      flex-grow: 1;
    }

    &-input-label {
      padding: 0 0.2rem;
    }
    &-input {
      padding: 0.5rem;
      border: 0;
      outline: 0;
      background-color: #eee;
      width: 100%;
    }
  }
}

.get-location-btn {
  width: 2rem;
  height: 2rem;
}
</style>
