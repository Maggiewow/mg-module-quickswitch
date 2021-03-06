/*
 * @Author: your name
 * @Date: 2020-07-23 09:48:43
 * @LastEditTime: 2020-11-23 11:21:48
 * @LastEditors: 赵婷婷
 * @Description: In User Settings Edit
 * @FilePath: \sucai-modal\src\router\index.js
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Selfshow from '../views/selfshow.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/selfshow',
    name: '_selfshow',
    meta: {
      hideInMenu: true,
    },
    component: Selfshow,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
