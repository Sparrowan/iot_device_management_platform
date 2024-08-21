import { defineStore } from 'pinia'
import type { configurationType, configurationState } from '@/utils/types'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const baseUrl = 'http://localhost:8000/configs'
export const useConfigurationStore = defineStore<
  string,
  configurationState,
  {},
  {
    fetchConfigurations(): Promise<void>
    deleteConfiguration(configurationId: string): Promise<boolean | void>
    addConfiguration(newConfiguration: configurationType): Promise<configurationType | void>
  }
>('configuration', {
  state: (): configurationState => ({
    configurations: [],
    loading: false,
    error: null,
    configuration: null
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
        const response = await axios.get(baseUrl)
        this.configurations = response.data as configurationType[]
      } catch (error) {
        this.error = (error as Error).message
      } finally {
        this.loading = false
      }
    },
    async deleteConfiguration(configurationId: string) {
      const toast = useToast()
      try {
        const confirm = window.confirm('Are you sure you want to delete this configuration?')
        if (confirm) {
          await axios.delete(`${baseUrl}/${configurationId}`)
          toast.success('Configuration Deleted Successfully')
          return true
        }
      } catch (error) {
        console.error('Error deleting configuration', error)
        toast.error('Configuration Not Deleted')
      }
    },
    async addConfiguration(newConfiguration: configurationType) {
      const toast = useToast()

      try {
        const response = await axios.post(baseUrl, newConfiguration)
        toast.success('Configuration Added Successfully')
        return response.data
      } catch (error) {
        console.error('Error adding configuration', error)
        toast.error('Configuration Was Not Added')
      }
    }
  }
})
