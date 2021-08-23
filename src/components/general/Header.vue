<template>
  <header>
    <div class="header__wrapper">
      <div class="header__logo">
        <router-link to="/">
          Katrin Mentz
        </router-link>
      </div>
      <nav class="header__nav">
        <ul>
          <li v-for="item in menu" :key="'menu-item-' + item.id">
            <router-link :to="item.path">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <router-link to="/imprint" class="imprint">Imprint</router-link>
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
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;

  .header {
    &__wrapper {
      @include paddingLeftWide;
      @include flex-row-sb;

      @include small {
        @include paddingRightWide;
      }
    }

    &__logo {
      a {
        display: inline-block;
        text-decoration: none;
        line-height: $headerHeight; 

        @include small {
          line-height: 40px;
        }
      }
    }

    &__nav {
      height: 100%;

      ul {
        margin: 0;
        padding: 0;
        @include flex-row-sb;

        @include small {
          margin-right: 0;
          @include flex-col-sb;
        }

        li {
          list-style: none;
          text-align: right;

          a {
            position: relative;
            display: inline-block;
            text-decoration: none;
            line-height: $headerHeight;
            margin: 0 $basePadding;

            @include small {
              margin: 0;
              line-height: 40px;
            }

            &.router-link-exact-active:after {
              content: '';
              position: absolute;
              display: block;
              width: 100%;
              height: 2px;
              bottom: calc(50% - 16px);
              background-color: $black;
            }
          }
        }
      }
    }
  }

  .imprint {
    position: fixed;
    transform: rotate(-90deg) translateY(-50%);
    text-decoration: none;
    right: 0px;
    top: 50%;

    @include small {
      right: -20px;
    }

    &.router-link-exact-active:after {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      bottom: calc(50% - 16px);
      background-color: $black;
    }
  }
}
  
</style>
