<template>
  
  <div id="submit">
    <router-link to="/submit?quick=true">Quick Submit</router-link> | 
    <router-link to="/submit">normal Submit</router-link>
    <!-- quick -->
    <div v-if="quick" class="submit__quick">
      <video ref="myvideo" src="#" width="300px" height="300px" autoplay></video>
      <form @submit.prevent="submitForm" class="submit__form">
        <label for="latitude">latitude</label>
        <input type="text" name="latitude" v-model="latitude">
        <label for="longitude">longitude</label>
        <input type="text" name="longitude" v-model="longitude">
        <label for="description">description</label>
        <input type="text" name="description" v-model="description">
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
export default {
name:"submit",
data(){
  return{
    videoSrc: null,
    latitude:null,
    longitude:null,
    description: 'an empty tree bed'
  }
},
computed:{
  quick(){
    if(this.$route.query.quick === 'true'){
        return true
    } 
    return false;
  }
},
methods:{
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      });
  } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
    alert('geo location is not available or turned off')
  }
  },
  async getVideo(){
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    this.$refs.myvideo.srcObject = stream
    this.$refs.myvideo.play();
    // this.video.play();
  },
  submitForm(){
    const data = {
      latitude: this.latitude,
      longitude: this.longitude,
      description: this.description
    }

    this.$store.dispatch('addTodo', data);
  }
},
mounted(){
  this.getVideo()
  this.getLocation()
}
}
</script>

<style scoped lang="scss">
.submit__quick{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  video{
    display: block;
  }


  .submit__form{

    label{
      display: block;
      text-align: left;
    }

    button{
    display: block;
    padding:1rem;
    background-color: #27ae60 ;
    color:white;
    font-size:1.5rem;
    border:none;
    box-shadow:4px 4px 0px black;
    margin:1rem auto;
  }

  }
  
  
}
</style>