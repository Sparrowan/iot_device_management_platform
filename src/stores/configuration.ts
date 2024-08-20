import { defineStore } from 'pinia'
import type { configurationType, configurationState } from '@/utils/types'
import axios from 'axios'

export const useConfigurationStore = defineStore<
  string,
  configurationState,
  {},
  {
    fetchConfigurations(): Promise<void>
  }
>('configuration', {
  state: (): configurationState => ({
    configurations: [],
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
        const response = await axios.get('http://localhost:8000/configs')
        this.configurations = response.data as configurationType[]
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    }
  }
})
