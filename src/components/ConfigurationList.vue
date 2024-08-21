<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigurationStore } from '../stores/configuration'
import { onMounted, ref, computed, watch } from 'vue'
import type { configurationState } from '../utils/types'
import type { Ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ConfigurationListing from '@/components/ConfigurationListing.vue'
import { debounce } from 'lodash'

const configurationStore = useConfigurationStore()

const { configurations, loading, searchTerm } = storeToRefs(configurationStore) as {
  configurations: Ref<configurationState['configurations']>
  loading: Ref<configurationState['loading']>
  searchTerm: Ref<string>
}

const { fetchConfigurations } = configurationStore

// Initialize fetchConfigurations on mount
onMounted(() => {
  fetchConfigurations()
})

// Search input state
const searchQuery = ref('')

// Debounce search query updates
const updateSearchTerm = debounce((term: string) => {
  configurationStore.searchTerm = term
}, 300)

// Watch for changes in the search query
watch(searchQuery, (newQuery) => {
  updateSearchTerm(newQuery)
})

// Filtered configurations based on search term
const filteredConfigurations = computed(() => {
  const term = searchTerm.value.toLowerCase()
  return configurations.value.filter(
    (config) =>
      config.name.toLowerCase().includes(term) ||
      config.description.toLowerCase().includes(term) ||
      JSON.stringify(config.content).toLowerCase().includes(term)
  )
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Configurations</h2>

      <!-- Search Input -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          @input="updateSearchTerm(searchQuery)"
          type="text"
          placeholder="Search by name, description, or content"
          class="border rounded w-full py-2 px-3 mb-4"
        />
      </div>

      <div v-if="loading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConfigurationListing
          v-for="configuration in filteredConfigurations"
          :key="configuration.id"
          :configuration="configuration"
        />
      </div>
    </div>
  </section>
</template>
