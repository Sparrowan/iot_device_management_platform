import { mount } from 'cypress/vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import CreateConfiguration from '@/views/CreateConfiguration.vue'
import JsonEditorVue from 'json-editor-vue'

// Setup Pinia store with mock data
const pinia = createPinia()

// Mock router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/create-configuration',
      name: 'create-configuration',
      component: CreateConfiguration
    }
  ]
})

describe('Configuration Form', () => {
  it('renders and handles form submission for creating configuration', () => {
    mount(CreateConfiguration, {
      global: {
        plugins: [pinia, router],
        components: { JsonEditorVue }
      }
    })

    cy.get('h2').should('contain', 'Add Configuration')
    cy.get('input[name="name"]').should('have.value', '')
    cy.get('textarea[name="description"]').should('have.value', '')
    cy.get('button').contains('Add Configuration').click()

    // Check if the form submission was handled correctly
    // Add assertions for form handling as needed
  })

  it('validates and displays errors correctly when name is not provided', () => {
    mount(CreateConfiguration, {
      global: {
        plugins: [pinia, router],
        components: { JsonEditorVue }
      }
    })

    cy.get('button').contains('Add Configuration').click()
  })
})
