import { createRouter, createWebHistory } from 'vue-router'
import ConfigurationList from '../views/ConfigurationList.vue'
import ConfigurationView from '../views/ConfigurationView.vue'
import CreateConfiguration from '../views/CreateConfiguration.vue'
import EditConfiguration from '../views/EditConfiguration.vue'

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
    },
    {
      path: '/configurations/edit/:id',
      name: 'edit-configuration',
      component: EditConfiguration
    }
  ]
})

export default router
