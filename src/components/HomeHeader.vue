<template>
  <header class="header">
    <!-- <img class="header__img" src="../assets/MoreTrees_Logo_Arboret-nobg.png" /> -->
    <h1 class="header__title">“It's always a great day to plant a tree in NYC.” <span> - MoreTrees.nyc</span></h1>
    <!-- <h1 class="header__title">More Trees NYC</h1> -->
    <div class="cta">
      <button class="cta__button">Get Started</button>
      <button class="cta__button">Submit</button>
    </div>
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
  background-image: url(../assets/header-bg.png);
  background-position: center bottom;
  background-repeat: no-repeat;
  border: 4px solid black;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  text-align: center;
  padding: 2rem 3rem;

  &__title {
    background-color:white;
    max-width: 30rem;
    margin-top: 0.8rem;
    font-weight: 900;
    font-size: 2.35rem;
    margin-bottom: 1rem;
    padding:1rem;
    border: 2px solid #eee;
    box-shadow: 4px 4px #eee;
    font-weight:100;
    text-align:left;

    span {
      font-size: 1rem;
    }
  }


  .cta {
    display: flex;

    &__button {
      border: 2px solid black;
      padding: 1rem 1.2rem;
      text-transform: uppercase;
      letter-spacing: 0.2ch;
      margin-top: 1rem;
      background: white;
      width: 160px;
      box-shadow: 3px 3px black;
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
