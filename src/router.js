import Vue from 'vue';
import Router from 'vue-router';
import AppGoods from './components/AppGoods/AppGoods.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: AppGoods
    },
    {
      path: '/ratings',
      name: 'ratings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/AppRatings/AppRatings.vue')
    },
    {
      path: '/seller',
      name: 'seller',
      component: () => import('./components/AppSeller/AppSeller.vue')
    }
  ],
  // 使页面切换时滚动到页面顶部
  // scrollBehavior () {
  //   return { x: 0, y: 0 }
  // }
})
