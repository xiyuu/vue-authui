// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import api from './http/index'
import store from './store'

Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.withCredentials = true;//ÈÃajaxÐ¯´øcookie
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(api);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})