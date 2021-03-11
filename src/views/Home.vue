<template>
  <div class="home">
    <article v-for="post in posts" :key="post.id">
      <router-link :to="'/post/' + post.id">Post {{ post.id }}</router-link>
    </article>
  </div>
</template>

<script>
import utils from '@/utils/utils';

export default {
  name: 'Home',
  computed: {
    posts: function () {
      return this.$store.state.posts.content;
    }
  },
  mounted() {
    if (!this.$store.state.posts.content.length) {
      utils.get.content('posts')
        .then(res => this.$store.commit('setPosts', utils.map.posts(res)))
    }
  }
};
</script>
