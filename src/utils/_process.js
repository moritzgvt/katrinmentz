import store from '../store/store'
import { map, err } from './utils'

const process = {
  posts: (payload) => {
    try {
      const mappedPosts = map.posts(payload);
      store.commit('setPosts', mappedPosts);
    } catch (error) {
      err.throw(error)
    }
  },
  page: (payload) => {
    try {
      const mappedPage = map.page(payload);
      store.commit('setPage', mappedPage);
    } catch (error) {
      err.throw(error)
    }
  },
  menu: (payload) => {
    try {
      const mappedMenu = map.menu(payload);
      store.commit('setMenu', mappedMenu);
    } catch (error) {
      err.throw(error)
    }
  }
}

export default process;