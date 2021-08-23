<template>
  <div id="app">
    <div id="sentinel"/>

    <Header/>

    <main>
      <router-view/>
    </main>

    <footer>
      <img src="./assets/symbols/smiley.svg" alt="Smiley">
    </footer>
  </div>
</template>

<script>
import Header from '@/components/general/Header';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang="scss">
  main {
    position: relative;
    margin-top: $headerHeight;
  }

  footer {
    height: 100px;
    margin: 50px 0;

    img {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }
</style>
