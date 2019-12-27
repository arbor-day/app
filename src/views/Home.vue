<template>
  <div class="home">
    <header class="header">
      <h1 class="header__title">It's always a great day to plant a tree in NYC.</h1>
      <button class="header__cta">Get Started</button>
    </header>
    <main>
      <section class="">
        <h3>It starts with one tree</h3>
      </section>

      <section>
        <h3>How it works</h3>
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
  // background-image: linear-gradient(to right bottom, #B4EC51, rgba(66, 147, 33, 0.509)), url("../assets/ny-stock-exchange-tree-via-MilleFioriFavoriti.jpg");
   background-image: linear-gradient(to right bottom, rgba(180, 236, 81, 0.109), rgba(66, 147, 33, 0.909));
  background-size: cover;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  padding:2rem 3rem;

  .header__title {
    max-width: 22rem;
    margin-top: 0.8rem;
    font-weight: 900;
    font-size: 2.35rem;
  }

  .header__cta {
    border:4px white;
    padding:1rem 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.2ch;
    margin-top:1rem;
    background:white;
  }
}

section {
  margin: 2rem 0;
}
</style>
