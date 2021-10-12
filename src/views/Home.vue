<template>
  <Grid class="home">
    <section class="home__hero" ref="hero">
      <h1 v-if="options" v-html="options.hero">
        Etza, My Name is Katrin & I make your things pretty. <br>
        Have a look here.
      </h1>
    </section>

    <Arrow bottom="40"/>

    <section class="home__flow item-container">
      <article 
        v-for="post in posts"
        :key="post.id"
        :class="post.position"
        class="item"
        :style="getSlope()"
      >
        <router-link :to="'/post/' + post.id">
          <img :src="post.image.size.large" :alt="post.image.alt">
        </router-link>
      </article>

      <div id="load-more-sentinel"></div>
    </section>
  </Grid>
</template>

<script>
import utils from '@/utils/utils';
import Grid from '@/components/general/Grid';
import Arrow from '@/components/general/Arrow';

export default {
  name: 'Home',
  components: {
    Grid,
    Arrow
  },
  computed: {
    posts: function () {
      return this.$store.state.posts.content;
    },
    options: function () {
      return this.$store.state.hero;
    },
    loadMorePossible: function () {
      return this.$store.state.posts.count < this.$store.state.posts.total;
    }
  },
  data: function() {
    return {
      modSlope: null
    }
  },
  methods: {
    getSlope: () => utils.methods.slope(),
    scrollHandler: function () {
      utils.methods.parallax(this.$refs.hero)
    },
    loadMoreHandler: function (entries) {
      if (this.loadMorePossible) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            utils.get.content('posts', { offset: this.$store.state.posts.count })
              .then(res => this.$store.commit('setPosts', utils.map.posts(res)))
          }
        });
      }
    }
  },
  mounted() {
    if (!this.$store.state.hero) {
      utils.get.content('options/options', { api: 'acf' })
        .then(res => this.$store.commit('setHero', utils.map.options(res)))
    }

    if (!this.$store.state.posts.content.length) {
      utils.get.content('posts')
        .then(res => this.$store.commit('setPosts', utils.map.posts(res)))
    }

    document.addEventListener('scroll', this.scrollHandler);

    let observer = new IntersectionObserver(this.loadMoreHandler);
    observer.observe(document.querySelector('#load-more-sentinel'));
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollHandler);
  }
};
</script>

<style lang="scss" scoped>
.home {
  &__hero {
    position: relative;
    height: calc(100vh - #{$headerHeight});
    z-index: 20;
    pointer-events: none;

    @include paddingXWide;
    @include heroArea;
    
    h1 {
      position: absolute;
      margin: 0;
      bottom: 50%;
      word-wrap: break-word;
      padding-right: $basePadding;
    }
  }
}
</style>