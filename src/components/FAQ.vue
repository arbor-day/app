<template>
  <div class="faq">
    <!--  -->
    <article class="faq__container">
      <p class="faq__question">
        <span class="faq__symbol">+</span> Who funds MoreTrees?
      </p>
      <p class="faq__answer">
        <span class="faq__symbol">↳</span> MoreTrees is a side project by Andy and Joey. The operating costs of the web server, the organization time, etc are all done without compensation. If you'd like to support the project, feel free to holler!
      </p>
    </article>
    <!--  -->
    <article class="faq__container">
      <p class="faq__question">
        <span class="faq__symbol">+</span> Is MoreTrees part of the city government?
      </p>
      <p class="faq__answer">
        <span class="faq__symbol">↳</span> MoreTrees is NOT part of the city government. It might broadly be categorized as a civic engagement from concerned/curious citizens. In other words, we're just two people (and friends) who want to make it easier for the city to plant trees.
      </p>
    </article>
    <!--  -->
    <article class="faq__container">
      <p class="faq__question">
        <span class="faq__symbol">+</span> Are there opportunities to contribute?
      </p>
      <p class="faq__answer">
        <span class="faq__symbol">↳</span> There sure are! There are many ways to get involved. You can be a mapper, organize a planting, become a steward, or just spread the word. Any and every contribution is meaningful.
      </p>
    </article>
    <!--  -->
    <article class="faq__container">
      <p class="faq__question">
        <span class="faq__symbol">+</span> Can I make a donation?
      </p>
      <p class="faq__answer">
        <span class="faq__symbol">↳</span> You can donate to support our server costs or donate money to any of these fine organizations...
      </p>
    </article>
    <!--  -->
    <article class="faq__container">
      <p class="faq__question">
        <span class="faq__symbol">+</span> Does the city really plant trees for free?
      </p>
      <p class="faq__answer">
        <span class="faq__symbol">↳</span> Yes! This is why this project started. We wanted a way to continually work towards identifying empty tree beds where the city could plant trees throughout New York.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  name: "faq"
};
</script>

<style scoped lang="scss">
.faq {
    max-width: 600px;
    margin:0 auto;

    &__container{
      display:flex;
      flex-direction:column;
      text-align:left;
      margin-bottom:1rem;
      border:2px solid black;
    }

    &__question{
      font-size:1.6rem;
      font-weight: bold;
      padding: 0.5rem 0.25rem;
      background-color:black;
      color:white;
    }
    &__answer{
      font-size:1.4rem;
      padding: 0.5rem 0.25rem;
      margin-left:0.25rem;
      margin-top:0.25rem;
      background-color:white;
      color:black;
    }

    &__symbol{
      font-weight: bold;
    }
  }

</style>
