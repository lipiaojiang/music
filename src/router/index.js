import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('../views/music'),
      children: [
        {
          path: '',
          component: require('../views/rank')
        },
        {
          path: 'rank',
          component: require('../views/rank')
        },
        {
          path: 'singer',
          component: require('../views/singer')
        },
        {
          path: 'hot',
          component: require('../views/hot')
        }
      ]
    },
    {
      path: '/search',
      component: require('../components/search')
    },
    {
      path: '/rank_detail/:info',
      component: require('../views/rank_detail')
    },
    {
      path: '/singer_detail/:info',
      component: require('../views/singer_detail')
    },
    {
      path: '/album_detail/:info',
      component: require('../views/album_detail')
    }
  ],
  // mode: 'history',
  base: __dirname,
  linkActiveClass: 'active'
})
