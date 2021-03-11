<template>
  <div v-if="post" class="post">
    <h1>{{ post.title }}</h1>
    <p v-html="post.content" />
  </div>
</template>

<script>
import utils from '@/utils/utils';

export default {
  name: 'Post',
  computed: {
    post: function () {
      return this.$store.getters.getPost(this.$route.params.id);
    }
  },
  mounted() {
    if (!this.$store.state.posts.content.length) {
      utils.get.content('posts')
        .then(res => utils.process.posts(res))
        .catch(err => utils.err.throw(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  section {
    width: 100vw;

    img {
      width: 100%;
    }
  }
}
</style>
