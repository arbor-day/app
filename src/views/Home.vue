<template>
  <div class="home">
    <header>
      <h1>Every Day is Arbor day</h1>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique sit quod aliquam sint voluptatem veritatis nam est ab veniam officia possimus repellat eveniet, quisquam quaerat, doloremque delectus quia voluptas nisi.</p>
    </header>
    <main>
      <section>
        <h2>Why we're doing this</h2>
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
header{
  background-color:aliceblue;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;

  p{
    max-width:60rem;
  }
}

section{
  margin: 2rem 0;
}

</style>
