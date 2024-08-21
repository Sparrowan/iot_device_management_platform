<script setup lang="ts">
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BackButton from '@/components/BackButton.vue'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import { useConfigurationStore } from '../stores/configuration'
import type { configurationState } from '../utils/types'

const configurationStore = useConfigurationStore()

const { configurations, loading, error, configuration } = storeToRefs(configurationStore) as {
  configurations: Ref<configurationState['configurations']>
  loading: Ref<configurationState['loading']>
  error: Ref<configurationState['error']>
  configuration: Ref<configurationState['configuration']>
}

const { fetchConfigurations, deleteConfiguration } = configurationStore

const route = useRoute()
const configurationId = route.params.id as string
const router = useRouter()

onMounted(async () => {
  // Check if the configuration exists in the store
  const existingConfig = configurationStore.getConfigById(configurationId)
  if (existingConfig) {
    configuration.value = existingConfig
  } else {
    // Fetch the configurations from the server if not available in the store
    await fetchConfigurations()
    configuration.value = configurationStore.getConfigById(configurationId)
  }
})
const handleDelete = async () => {
  if (deleteConfiguration(configurationId)) {
    await fetchConfigurations()
    router.push('/')
  }
}
</script>
<template>
  <BackButton />
  <section v-if="!loading && configuration" class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h1 class="text-3xl font-bold mb-4">{{ configuration.name }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ configuration.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Configuration Description</h3>
            <p class="mb-4">{{ configuration.description }}</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Content Details</h3>
            <div v-if="configuration.content">
              <div v-for="(value, key) in configuration.content" :key="key" class="mb-2">
                <strong class="text-gray-600">{{ key }}:</strong>
                <span v-if="Array.isArray(value)">
                  <!-- Display array values -->
                  <ul class="list-disc list-inside">
                    <li v-for="item in value" :key="item">{{ item }}</li>
                  </ul>
                </span>
                <span v-else>
                  <!-- Display other types of values -->
                  {{ value }}
                </span>
              </div>
            </div>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Configuration</h3>
            <RouterLink
              :to="`/configurations/edit/${configuration.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Configuration</RouterLink
            >
            <button
              @click="handleDelete"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Configuration
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <div v-else-if="loading" class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>

  <div v-else class="text-center text-gray-500 py-6">
    <p>Configuration not found.</p>
  </div>
</template>
