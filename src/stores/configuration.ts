import { defineStore } from 'pinia'
import type { configurationType } from '@/utils/types'

interface State {
  configurations: configurationType[]
  configuration: configurationType | null
  loading: boolean
  error: string | null
}

export const usePostStore = defineStore({
  id: 'configuration',
  state: (): State => ({
    configurations: [],
    configuration: null,
    loading: false,
    error: null
  }),
  getters: {
    getConfigById: (state) => {
      return (configId: string): configurationType | undefined =>
        state.configurations.find(
          (configuration: configurationType) => configuration.id === configId
        )
    }
  },
  actions: {
    async fetchConfigurations() {
      this.configurations = []
      this.loading = true
      try {
        this.configuration = (await fetch('http://localhost:8000/configs').then((response) =>
          response.json()
        )) as configurationType
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})
