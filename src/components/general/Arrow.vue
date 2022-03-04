<template>
  <div class="arrow" :class="{ 'deg90' : historyMode, 'deg180' : !historyMode }">
    <img ref="arrow" src="../../assets/symbols/arrow.svg" alt="Arrow"/>
  </div>
</template>

<script>
import utils from '@/utils/utils'
import router from '@/router/router'

export default {
  name: 'Arrow',
  data: function() {
    return {
      defaultCallback: () => window.scrollTo({ 
        top: window.innerHeight / 2,
        behavior: 'smooth'
      }),
      activeCallback: () => window.scrollTo({
        top: 0,
        behavior: 'smooth'
      }),
      backCallback: () => router.go(-1)
    }
  },
  props: {
    historyMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick: function(event) {
      if (event.target === this.$refs.arrow) {

        if (event.target.parentElement.classList.contains('active')) {
          this.activeCallback()
        } else {
          this.historyMode ? this.backCallback() : this.defaultCallback()
        }

      }
    },
    handleIntersection: function(entries, observer) {
      window.observer = observer;
      
      entries[0].isIntersecting
        ? this.$refs.arrow.parentElement.classList.remove('active')
        : this.$refs.arrow.parentElement.classList.add('active')
    }
  },
  mounted: function() {
    document.addEventListener('click', this.handleClick);

    utils.methods.observeSentinel(this.handleIntersection);
  },
  destroyed: function() {
    document.removeEventListener('click', this.handleClick);
    
    if (window.observer) {
      window.observer.disconnect();
    }
  }
}
</script>

<style lang="scss" scoped>
  .arrow {
    position: fixed;
    cursor: pointer;
    z-index: 100;
    height: 40px;
    bottom: 50px;

    @include paddingXWide;

    img {
      height: 100%;
    }

    transition: all .25s $cubic-transition;

    @include medium {
      height: 30px;
    }

    &.deg180 {
      transform: rotate(180deg);
    }

    &.deg90 {
      transform: rotate(-90deg);
    }

    &.active {
      transform: rotate(0deg);
    }
  }
</style>
