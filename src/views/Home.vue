<template>
  <div class="home">
    <header>
      <h1>Every day is arbor day in NYC</h1>
      <p>
        MoreTrees.nyc is a grassroots tree mapping and planting initiative in New York City's Five Boroughs. 
      </p>
    </header>
    <main>
      <section>
        <h2>Why we're doing this</h2>
        <p></p>
      </section>

      <section>
        <h2>It's Free!</h2>
      </section>

      <section>
        <h2>Best damn city in the world</h2>
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
header {
  background-color: aliceblue;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    max-width: 30rem;
    margin-top: 1.5rem;
  }
}

section {
  margin: 2rem 0;
}
</style>
