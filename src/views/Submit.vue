<template>
  <div id="submit">
    <router-link to="/submit?quick=true">Quick Submit</router-link>|
    <router-link to="/submit">normal Submit</router-link>
    <!-- quick -->
    <div v-if="quick" class="submit__quick">
      <!-- <video
        ref="myvideo"
        width="360px"
        height="280px"
        autoplay
        muted
        playsinline
        id="myvideo"
      ></video>-->
      <div id="myCanvas"></div>
      <form @submit.prevent="submitForm" class="submit__form">
        <label for="latitude">latitude</label>
        <input type="text" name="latitude" v-model="latitude" />
        <label for="longitude">longitude</label>
        <input type="text" name="longitude" v-model="longitude" />
        <label for="description">description</label>
        <input type="text" name="description" v-model="description" />
        <button>submit!</button>
      </form>
      <!-- normal form -->
    </div>
    <div v-else>
      <p>form</p>
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
  computed: {
    quick() {
      if (this.$route.query.quick === "true") {
        return true;
      }
      return false;
    },
    videoElement() {
      return this.$refs.myvideo;
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      } else {
        // x.innerHTML = "Geolocation is not supported by this browser.";
        alert("geo location is not available or turned off");
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
        // NOTE: Set up is here
        sketch.setup = () => {
          sketch.createCanvas(360, 280);
          video = sketch.createCapture({
            audio: false,
            video: {
              facingMode: {
                exact: "environment"
              }
            }
          });
          video.size(360, 280);
          video.hide();
        }; // NOTE: Draw is here
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
#myvideo {
  display: none;
}

.submit__quick {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  video {
    display: block;
  }

  .submit__form {
    label {
      display: block;
      text-align: left;
    }

    button {
      display: block;
      padding: 1rem;
      background-color: #27ae60;
      color: white;
      font-size: 1.5rem;
      border: none;
      box-shadow: 4px 4px 0px black;
      margin: 1rem auto;
    }
  }
}
</style>
