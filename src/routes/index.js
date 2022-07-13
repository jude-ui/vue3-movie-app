import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'instant'
      }
    }
  },
  routes: [
    {
      path: '/',
      component: () => import('./Home')
    },
    {
      path: '/movie/:id',
      component: () => import('./Movie')
    },
    {
      path: '/about',
      component: () => import('./About')
    },
    {
      path: '/:notFound(.*)*',
      component: () => import('./NotFound')
    }
  ]
})