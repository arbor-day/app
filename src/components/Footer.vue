<template>
  <footer class="footer">
      <div class="footer__container">
        <nav class="footer__nav">
          <section class="footer__section">
            <ul class="footer__nav-list">
              <li class="footer__nav-list__item">about</li>
              <li class="footer__nav-list__item">contact</li>
              <li class="footer__nav-list__item">submit</li>
            </ul>
          </section>
          <section class="footer__section">
            <ul class="footer__nav-list">
              <li class="footer__nav-list__item">privacy</li>
              <li class="footer__nav-list__item">code of conduct</li>
              <li class="footer__nav-list__item">terms & conditions</li>
            </ul>
          </section>
          <section class="footer__section">
            <ul class="footer__nav-list">
              <li class="footer__nav-list__item">contribute</li>
              <li class="footer__nav-list__item">donate</li>
              <li class="footer__nav-list__item">events</li>
            </ul>
          </section>
        </nav>
        <p class="footer__copy">© 2019 MoreTrees.NYC, Brooklyn, NY</p>
      </div>
    </footer>
</template>
<script>
export default {
  name: "footer"
};
</script>

<style scoped lang="scss">

.footer{
  display: flex;
  flex-direction:column;
  padding:0.5rem 0rem;
  height: 16rem;
  width:100%;

  &__container{
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    background-color: black;
    padding-bottom:0.5rem;
  }

  &__copy{
    font-size:0.9rem;
    color:white;
  }

  &__nav{
    
    width:100%;
    height:100%;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.5rem;
    align-items: center;
  }

  &__section{
    text-align:center;
  }

  &__nav-list{
    list-style: none;

    &__item{
      font-size:1.2rem;
      color:white;
    }
  }
}

</style>
