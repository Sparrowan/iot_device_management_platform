<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConfigurationStore } from '../stores/configuration'
import { onMounted } from 'vue'

const configurationStore = useConfigurationStore()

const { configurations, loading, error } = storeToRefs(configurationStore)
const { fetchConfigurations } = configurationStore

onMounted(() => {
  fetchConfigurations()
})

console.log('configurations', configurations.value)
</script>

<template>
  <h1 class="text-2xl">Config List</h1>
  <div v-if="loading">Loading...</div>
  <div v-if="error">Error: {{ error }}</div>
  <ul v-if="configurations.length">
    <li v-for="config in configurations" :key="config.id">
      {{ config.name }}
    </li>
  </ul>
</template>
