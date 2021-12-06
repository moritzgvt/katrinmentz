<template>
  <div id="app">
    <div id="sentinel"/>

    <Header/>

    <main>
      <transition name="fade" mode="out-in" appear>
        <router-view/>
      </transition>
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
    min-height: 50vh;
  }

  footer {
    height: 100px;
    margin: 50px 0;
    transform: translateY(30vh);

    img {
      display: block;
      height: 100%;
      margin: 0 auto;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
