import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/router';
import store from './store/store';

Vue.config.productionTip = false;

import "@/assets/scss/index.scss"

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
