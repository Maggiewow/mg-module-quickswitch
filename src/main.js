/*
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2021-02-19 09:32:07
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \sucai-modal\src\main.js
 */

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import config from '@/config';

import { Message } from 'view-design';
import 'view-design/dist/styles/iview.css';
// Vue.use(ViewUI);

Vue.config.productionTip = false;
Vue.prototype.$config = config;
Vue.prototype.$Message = Message;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
