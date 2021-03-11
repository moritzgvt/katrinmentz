<template>
  <div v-if="page" class="page">
    <h1>{{ page.title }}</h1>
    <p v-html="page.content" />
  </div>
</template>

<script>
import utils from '@/utils/utils'
import store from '@/store/store'

export default {
  name: 'Page',
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