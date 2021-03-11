<template>
  <header>
    <nav class="nav">
      <ul>
        <li v-for="item in menu" :key="'menu-item-' + item.id">
          <router-link :to="item.path">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import utils from '@/utils/utils';
import store from '@/store/store';

export default {
  name: 'Header',
  computed: {
    menu: () => {
      return store.state.menu;
    }
  },
  mounted() {
    if (!store.state.menu) {
      utils.get.content('menu', { api: 'custom' })
        .then(res => utils.process.menu(res));
    }
  }
};
</script>

<style lang="scss" scoped>
  header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;

    nav {
      ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        margin: 0;
        padding: 0;

        li a {
          display: inline-block;
          margin: 0 5px;
          line-height: $header-height;
        }
      }
    }
  }
</style>
