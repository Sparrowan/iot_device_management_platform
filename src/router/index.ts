import { createRouter, createWebHistory } from 'vue-router'
import ConfigurationList from '../views/ConfigurationList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ConfigurationList
    },
    {
      path: '/create-configuration',
      name: 'create-configuration',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateConfiguration.vue')
    }
  ]
})

export default router
