<template>
    <div class="page__content">
      <Grid v-if="page" class="page">
        <h1>{{ page.title }}</h1>
        <p class="content" v-html="page.content"/>
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
  computed: {
    page: function () {
      return store.getters.getPageBySlug(this.$route.params.slug);
    }
  },
  methods: {
    loadPageContent: function () {
      utils.get.content('pages', { slug: this.$route.params.slug })
        .then(res => utils.process.page(res))
        .catch(err => utils.err.throw(err));
    }
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
    position: relative;
    top: 30vh;
    z-index: 10;

    @include medium {
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
}
</style>