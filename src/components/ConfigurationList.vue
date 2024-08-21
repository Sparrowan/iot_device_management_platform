<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigurationStore } from '../stores/configuration'
import { onMounted } from 'vue'
import type { configurationState } from '../utils/types'
import type { Ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import ConfigurationListing from '@/components/ConfigurationListing.vue'

const configurationStore = useConfigurationStore()

const { configurations, loading } = storeToRefs(configurationStore) as {
  configurations: Ref<configurationState['configurations']>
  loading: Ref<configurationState['loading']>
}
const { fetchConfigurations } = configurationStore

onMounted(() => {
  fetchConfigurations()
})
</script>

<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">Browse Configurations</h2>
      <div v-if="loading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ConfigurationListing
          v-for="configuration in configurations"
          :key="configuration.id"
          :configuration="configuration"
        />
      </div>
    </div>
  </section>
</template>
