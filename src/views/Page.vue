<template>
    <div v-if="page" class="page">
      <section class="page__content">
        <Grid v-if="page" class="page">
          <h1>{{ page.title }}</h1>
          <p v-if="width > 1000" class="content" v-html="page.content"/>
        </Grid>
      </section>

      <Grid v-if="page.images">
        <section class="page__images item-container">
          <div class="item right" :style="getSlope()">
            <img :src="page.image.size.large" :alt="page.title" loading="lazy">
          </div>
          
          <div v-for="image in page.images" :key="image.id" class="item" :class="getAlignment()" :style="getSlope()">
            <img  :src="image.size.large" :alt="image.alt" loading="lazy">
          </div> 

          <p v-if="width < 1000" v-html="page.content"/>
        </section>
      </Grid>
    </div>
</template>

<script>
import utils from '@/utils/utils'
import store from '@/store/store'

import Grid from '@/components/general/Grid';

export default {
  name: 'Page',
  components: {
    Grid
  },
  data() {
    return {
      alignments: [
        'left',
        'center',
        'right'
      ],
      width: null
    }
  },
  computed: {
    page: function () {
      return store.getters.getPageBySlug(this.$route.params.slug);
    }
  },
  methods: {
    getSlope: () => utils.methods.slope(),
    getAlignment: function() {
      return this.alignments[parseInt(Math.floor((Math.random() * 3)))];
    },
    loadPageContent: function () {
      utils.get.content('pages', { slug: this.$route.params.slug })
        .then(res => utils.process.page(res))
        .catch(err => utils.err.throw(err));
    },
    handleResize: function() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  created() {
    if (!this.page) {
      this.loadPageContent();
    }
  },
  watch: {
    $route() {
      if (!this.page) {
        this.loadPageContent();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &__content {
    @include paddingXWide;
    position: fixed;
    top: 30vh;
    z-index: 10;

    @include medium {
      position: relative;
      top: 25vh;
    }
  
    h1 {
      @include contentHead;
      margin: 0;
    }

    p {
      margin-top: 20px;
      @include contentTextPage;
    }
  }

  &__images {
    margin-top: 50vh;
  }
}
</style>