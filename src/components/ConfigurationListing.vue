<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineProps, ref, computed } from 'vue'
import type { configurationType } from '../utils/types'
import type { Ref } from 'vue'
import { useConfigurationStore } from '../stores/configuration'

const props = defineProps<{ configuration: configurationType }>()
const configurationStore = useConfigurationStore()

const showFullDescription: Ref<boolean> = ref(false)
const { fetchConfigurations, deleteConfiguration } = configurationStore

const toggleFullDescription = (): void => {
  showFullDescription.value = !showFullDescription.value
}

const truncatedDescription = computed((): string => {
  const description = props.configuration?.description || ''
  return showFullDescription.value || description.length <= 90
    ? description
    : description.substring(0, 90) + '...'
})

const handleDelete = async (configurationId: string) => {
  if (await deleteConfiguration(configurationId)) {
    await fetchConfigurations()
  }
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <h3 class="text-xl font-bold">{{ configuration?.name || 'Untitled' }}</h3>
      </div>

      <div class="mb-5">
        <div>
          {{ truncatedDescription }}
        </div>
        <button @click="toggleFullDescription" class="text-green-500 hover:text-green-600 mb-5">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <RouterLink
          :to="'/configurations/' + (configuration?.id || '')"
          class="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          View
        </RouterLink>
        <RouterLink
          :to="`/configurations/edit/${configuration.id}`"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Edit
        </RouterLink>
        <button
          @click="handleDelete(configuration?.id)"
          class="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
