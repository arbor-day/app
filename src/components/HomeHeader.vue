<template>
  <header class="header">
    <!-- <img class="header__img" src="../assets/MoreTrees_Logo_Arboret-nobg.png" /> -->
    <div class="cta">
      <button class="cta__button"><a href="#about">Get Started</a></button>
      <button class="cta__button">
        <router-link class="nav__link" to="/submit">Submit</router-link>
      </button>
    </div>
    <h1 class="header__title">
      “It's always a great day to plant a tree in NYC.”
      <span> - MoreTrees.nyc</span>
    </h1>
    <!-- <h1 class="header__title">More Trees NYC</h1> -->
  </header>
</template>

<script>
export default {
  name: "home-header"
};
</script>

<style lang="scss">
.header {
  background-color: aliceblue;
  // background-image: url(../assets/header-bg.png);
  background-image: url(../assets/nyc-1280x1280-crop.jpg);

  background-position: center bottom;
  background-repeat: no-repeat;
  // border: 4px solid black;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  text-align: center;
  padding: 0.5rem 1rem;

  // &__img{
  //   width:100%;
  // }

  @media screen and (max-width: 600px) {
    // align-items: center;
    justify-content: center;
    padding: 0.5rem 0.5rem;
    flex-direction: column-reverse;
  }

  &__title {
    background-color: white;
    max-width: 30rem;
    margin-top: 0.8rem;
    font-weight: 900;
    font-size: 2.35rem;
    margin-bottom: 0.5rem;
    padding: 1rem;
    border: 2px solid black;
    box-shadow: 4px 4px black;
    font-weight: 100;
    text-align: left;

    span {
      font-size: 1rem;
    }

    @media screen and (max-width: 600px) {
      font-size: 0.8rem;
      max-width: 100%;
      width: 100%;
    }
  }

  .cta {
    display: flex;
    width: 100%;
    justify-content: flex-start;

    &__button {
      border: 2px solid black;
      padding: 1rem 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2ch;
      margin-top: 0.5rem;
      background: white;
      width: 160px;
      box-shadow: 3px 3px black;

      a {
        color: black;
      }

      @media screen and (max-width: 600px) {
        width: 50%;
      }
    }

    &__button:hover {
      background-color: pink;
    }

    &__button:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
