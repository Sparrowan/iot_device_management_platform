import { mount } from 'cypress/vue'
import ConfigurationListing from '@/components/ConfigurationListing.vue'
import { createPinia } from 'pinia'
import { useConfigurationStore } from '@/stores/configuration'
import { getTimeStamp } from '@/utils/functions'
import { createRouter, createWebHistory } from 'vue-router'

// Mock data for testing
const mockConfiguration = {
  id: '1',
  name: 'Sample Configuration',
  description: 'This is a sample description that should be truncated.',
  content: { value: 'Sample content' },
  createdAt: getTimeStamp()
}

// Setup Pinia store with mock data
const pinia = createPinia()
const configurationStore = useConfigurationStore(pinia)
configurationStore.configurations = [mockConfiguration]

// Mock router setup
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ConfigurationListing
    }
  ]
})

describe('ConfigurationListing', () => {
  it('renders properly with provided props', () => {
    mount(ConfigurationListing, {
      global: {
        plugins: [pinia, router]
      },
      props: {
        configuration: mockConfiguration
      }
    })

    cy.get('h3.text-xl.font-bold').should('contain', 'Sample Configuration')
    cy.get('div').should('contain', 'This is a sample description that should be truncated.')
  })

  it('truncates description and toggles full description', () => {
    mount(ConfigurationListing, {
      global: {
        plugins: [pinia, router]
      },
      props: {
        configuration: mockConfiguration
      }
    })

    // Initially truncated description
    cy.get('div').should('contain', 'This is a sample description that should be truncated.')
    cy.get('button').contains('More').click()
    cy.get('div').should('contain', 'This is a sample description that should be truncated.')
    cy.get('button').contains('Less').click()
  })

  it('handles delete action correctly', () => {
    // Spy on the delete function
    cy.spy(configurationStore, 'deleteConfiguration').as('deleteConfiguration')

    mount(ConfigurationListing, {
      global: {
        plugins: [pinia, router]
      },
      props: {
        configuration: mockConfiguration
      }
    })

    cy.get('button').contains('Delete').click()
    cy.get('@deleteConfiguration').should('have.been.calledOnceWith', mockConfiguration.id)
  })
})
