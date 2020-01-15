<template>
  <div class="home">
    <header class="header">
      <img class="header__img" src="../assets/MoreTrees_Logo_Arboret-nobg.png" />
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

      <section class="section__how">
        <h2 class="section__title">How</h2>
        <div class="section__articles">
          <article class="section__article">
            <header class="section__article__header section__article__header--right">
              <div class="section__article__header__container">
                <h2 class="section__article__header__title">Connecting with the City</h2>
                <p class="section__article__header__text">
                  Whether you're new to the city or native New Yorker, we all have one thing in common: we spend a lot of time walking around the city.
                  You can help the MoreTrees project by keeping your eyes 👀 out for empty tree beds and submitting them to our database.
                  You can learn more about ways of <a href="#"> engaging with the city here</a>.
                </p>
              </div>
            </header>
            <div class="section__article__image section__article__image--city"></div>
          </article>

          <article class="section__article">
            <header class="section__article__header section__article__header--left">
              <div class="section__article__header__container">
                <h2 class="section__article__header__title">Connecting with You</h2>
                <p class="section__article__header__text">
                  MoreTrees was started by Andy and Joey, 2 New York transplants who were looking for a way to bring all the benefits of street trees to as many people across their neighborhood as possible.
                  Their hope was that other curious citizens like you could also bring trees to your neighborhood simply by helping to map and submit them to the city.
                  You can learn more about ways of <a href="#">getting involved in tree stewardship here</a>.
                </p>
              </div>
            </header>
            <div class="section__article__image section__article__image--you"></div>
          </article>

          <article class="section__article">
            <header class="section__article__header section__article__header--right">
              <div class="section__article__header__container">
                <h2 class="section__article__header__title">Connecting with the Environment</h2>
                <p class="section__article__header__text">
                  We live in a concrete jungle, but there are many ways to connect with the wonders of the environment right here in the city. Becoming a tree steward or caring for the street trees right in front of your house is a great way to get involved.
                  You can learn more about the <a href="#">urban environment here</a>.
                </p>
              </div>
            </header>
            <div class="section__article__image section__article__image--environment"></div>
          </article>
        </div>
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
      border: 4px white;
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

.main {
  margin: 2rem 0;

  .section {
    &__title {
      font-size: 2.6rem;
      width: 100%;
      position: relative;
      color: white;
    }

    &__title::before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      width: 300px;
      height: 100%;
      border: 2px solid black;
      background-color: black;
      z-index: -1;
    }

    &__body {
      width: 100%;
      height: 50vh;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 1rem;
      align-items: center;
    }

    &__card {
      width: 100%;
      height: 300px;
      border: 2px solid black;
      padding: 0.5rem;
      position: relative;

      &__title {
        position: absolute;
        bottom: 0;
        left: 0;
        // margin-top: -2rem;
        padding: 0.5rem;
        text-align: center;
        background-color: black;
        color: white;
      }

      &--map {
        background-image: url(../assets/placeholders/pin-1F4CD_color.png);
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
      }

      &--plant {
        background-image: url(../assets/placeholders/tree-1F333_color.png);
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
      }

      &--maintain {
        background-image: url(../assets/placeholders/water-1F6BF_color.png);
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &__project {
      margin-top: 4rem;
      margin-bottom: 2rem;
    }

    &__how {
      margin-top: 4rem;
      margin-bottom: 2rem;
    }

    &__articles {
      display: flex;
      flex-direction: column;
      margin-top: 2rem;
    }

    &__article {
      width: 100%;
      height: 50vh;
      display: grid;
      grid-template-columns: 1fr 1fr;

      &__header {
        height: 100%;
        padding: 1rem;
        grid-row: 1/3;

        &--left {
          grid-column: 1/2;
        }
        &--right {
          grid-column: 2/3;
        }

        &__container {
          height: 100%;
          width: 100%;
          padding: 1rem;
          text-align: left;
        }

        &__title {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        &__text {
          line-height: 1.4;
          font-size: 1.3rem;
        }
      }

      &__image {
        height: 100%;
        grid-row: 1/3;

        &--city {
          background-image: url(../assets/placeholders/tree-bed-IMG_8600.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        &--you {
          background-image: url(../assets/placeholders/andy-DSCF1815.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        &--environment {
          background-image: url(../assets/placeholders/800px-Prospect_Park_New_York_November_2016_002.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
    }
  }
}
</style>
