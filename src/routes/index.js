import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

export default createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
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