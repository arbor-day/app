<template>
  <div class="home">
    <header class="header">
      <img class="header__img" src="../assets/MoreTrees_Logo_Arboret-nobg.png">
      <h1 class="header__title">It's always a great day to plant a tree in NYC.</h1>
      <div class="cta">
        <button class="cta__button">Get Started</button>
        <button class="cta__button">Submit</button>
      </div>
    </header>
    <main class="main">
      <section class="section__project">
        <h2 class="section__title">The Project</h2>
        <div class="section__body">
          <div class="section__card section__card--map">
            <h3 class="section__card__title">Map</h3>
          </div>
          <div class="section__card section__card--plant">
            <h3 class="section__card__title">Plant</h3>
          </div>
          <div class="section__card section__card--maintain">
            <h3 class="section__card__title">Maintain</h3>
          </div>
        </div>
      </section>

      <section class="">
        <h2 class="section__title">How</h2>
        <p>Step 1: Notice</p>
        <p>Step 2: Catalog</p>
        <p>Step 3: Submit</p>
      </section>

    </main>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    // HelloWorld
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: aliceblue;
  background-size: cover;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding:2rem 3rem;

  &__title {
    max-width: 30rem;
    margin-top: 0.8rem;
    font-weight: 900;
    font-size: 2.35rem;
    margin-bottom:2rem;
  }

  &__img{
    width:80%;
    margin-bottom: 2rem;
  }

  .cta{
    display:flex;

    &__button {
      border:4px white;
      padding:1rem 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2ch;
      margin-top:1rem;
      background:white;
      width:160px;
      transition: background-color 0.6s;
    }

    &__button:hover{
      background-color: #9EEBCF;
    }

    &__button:not(:last-child){
      margin-right:1rem;
    }

  }
  
}

.main{
  margin: 2rem 0;

  .section {
    &__title{
      font-size: 2.6rem;
    }

    &__body{
      width:100%;
      height: 50vh;
      display:grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap:1rem;
      align-items:center;
    }

    &__card{
      width:100%;
      height: 300px;
      border: 2px solid black;
      padding:0.5rem;
      position:relative;

      &__title{
        position: absolute;
        bottom:0;
        left:0;
        // margin-top: -2rem;
        padding: 0.5rem;
        text-align:center;
        background-color:black;
        color:white;
      }

      &--map{
        background-image: url(../assets/placeholders/pin-1F4CD_color.png);
        background-size:auto 100%;
        background-repeat:no-repeat;
        background-position: center;
      }

      &--plant{
        background-image: url(../assets/placeholders/tree-1F333_color.png);
        background-size:auto 100%;
        background-position: center;
        background-repeat:no-repeat;
      }

      &--maintain{
        background-image: url(../assets/placeholders/water-1F6BF_color.png);
        background-size:auto 100%;
        background-repeat:no-repeat;
        background-position: center;
      }
    }
  }


}

</style>
