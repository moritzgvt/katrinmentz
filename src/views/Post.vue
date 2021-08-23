<template>
  <div class="post" v-if="post">
    <section class="post__content" ref="content">
      <Grid>
        <h1>{{ post.title }}</h1>
        <p v-if="width > 1000" class="content" v-html="post.content"/>
      </Grid>
    </section>

    <Arrow bottom="80" historyMode/>

    <Grid>
      <section class="post__images item-container">
        <div class="item right" :style="getSlope()">
          <img :src="post.image.size.large" :alt="post.title" loading="lazy">
        </div>
        
        <div v-for="image in post.images" :key="image.id" class="item" :class="getAlignment()" :style="getSlope()">
          <img  :src="image.size.large" :alt="image.alt" loading="lazy">
        </div> 

        <p v-if="width < 1000" v-html="post.content"/>
      </section>
    </Grid>
  </div>
</template>

<script>
import utils from '@/utils/utils';
import Grid from '@/components/general/Grid';
import Arrow from '@/components/general/Arrow';

export default {
  name: 'Post',
  components: {
    Grid,
    Arrow
  },
  data: function() {
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
    post: function () {
      return this.$store.getters.getPost(this.$route.params.id);
    }
  },
  methods: {
    getSlope: () => utils.methods.slope(),
    getAlignment: function() {
      return this.alignments[parseInt(Math.floor((Math.random() * 3)))];
    },
    handleResize: function() {
      this.width = window.innerWidth;
    }
  },
  mounted: function() {
    if (!this.$store.state.posts.content.length) {
      utils.get.content('posts')
        .then(res => utils.process.posts(res))
        .catch(err => utils.err.throw(err))
    }

    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed: function() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss" scoped>
  .post {
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
        @include contentText;
        margin-top: 80px;
      }
    }

    &__images {
      @include imageArea;
      @include paddingXNarrow;
      margin-top: 70vh;

      p {
        @include contentText;
      }
    }
  }
</style>
