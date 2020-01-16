<template>
  <header class="header">
    <img class="header__img" src="../assets/MoreTrees_Logo_Arboret-nobg.png" />
    <h1 class="header__title">It's always a great day to plant a tree in NYC.</h1>
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

<style scoped lang="scss">
.header {
  // background-color: aliceblue;
  border: 2px solid black;
  background-size: cover;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 2rem 3rem;

  &__title {
    max-width: 30rem;
    margin-top: 0.8rem;
    font-weight: 900;
    font-size: 2.35rem;
    margin-bottom: 2rem;
  }

  &__img {
    width: 80%;
    margin-bottom: 2rem;
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
      transition: background-color 0.6s;
    }

    &__button:hover {
      background-color: #9eebcf;
    }

    &__button:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
