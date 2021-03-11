import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: null,
    posts: {
      content: [],
      count: 0,
      total: 0
    },
    pages: [],
    error: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts.content = [...state.posts.content, ...payload];
      state.posts.count = state.posts.count + payload.length;
    },
    setPostsTotal: (state, payload) => {
      state.posts.total = parseInt(payload);
    },
    setMenu: (state, payload) => {
      state.menu = payload;
    },
    setPage: (state, payload) => {
      if (!state.pages.filter(page => page.slug == payload.slug)[0]) {
        state.pages = [...state.pages, ...payload];
      }
    },
    setError: (state, payload) => {
      state.error = payload;
    },
  },
  getters: {
    getPost: (state) => (identifier) => {
      if (state.posts) {
        return state.posts.content.filter(post => post.id == identifier)[0];
      } else {
        throw new Error('No posts available.');
      }
    },
    getPageBySlug: (state) => (identifier) => {
      if (state.pages) {
        return state.pages.filter(page => page.slug == identifier)[0];
      } else {
        throw new Error('No pages available.');
      }
    } 
  },
  
});
