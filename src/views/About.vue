<template>
  <div class="about">
    <header>
      <h1>We love trees</h1>
      <p>Oh yes.</p>
    </header>
    <main>
      <section>
        <h2>Who are we?</h2>
      </section>

      <section>
        <h2>Contact us</h2>
      </section>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.about{
  
}

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