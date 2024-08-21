import { createRouter, createWebHistory } from 'vue-router'
import ConfigurationList from '../views/ConfigurationList.vue'
import ConfigurationView from '../views/ConfigurationView.vue'
import CreateConfiguration from '../views/CreateConfiguration.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ConfigurationList
    },
    {
      path: '/configurations/:id',
      name: 'configuration',
      component: ConfigurationView
    },
    {
      path: '/create-configuration',
      name: 'create-configuration',
      component: CreateConfiguration
    }
  ]
})

export default router
