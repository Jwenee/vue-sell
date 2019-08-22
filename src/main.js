import Vue from 'vue';
import router from './router';
import App from './App.vue';
import factClick from 'fastclick';

import './common/stylus/index.styl';

Vue.config.productionTip = false;
factClick.attach(document.body)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
