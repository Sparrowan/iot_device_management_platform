<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import JsonEditorVue from 'json-editor-vue'
import { useConfigurationStore } from '../stores/configuration'
import { useRouter, useRoute } from 'vue-router'
import type { Ref } from 'vue'
import type { configurationState } from '../utils/types'
import { storeToRefs } from 'pinia'
import { getTimeStamp } from '../utils/functions'

const configurationStore = useConfigurationStore()

const { configuration } = storeToRefs(configurationStore) as {
  configuration: Ref<configurationState['configuration']>
}

const route = useRoute()
const configurationId = route.params.id as string

const form = reactive({
  name: '',
  description: '',
  content: { value: '' }
})

const { fetchConfigurations, addConfiguration, updateConfiguration } = configurationStore

onMounted(async () => {
  await fetchConfigurations()
  if (configurationId) {
    const existingConfig = configurationStore.getConfigById(configurationId)
    if (existingConfig) {
      configuration.value = existingConfig
    }

    // Populate form after configuration is loaded
    if (configuration.value) {
      form.name = configuration.value.name
      form.description = configuration.value.description
      form.content = { value: JSON.stringify(configuration.value.content) }
    }
  }
})

const toast = useToast()
const router = useRouter()
const handleSubmit = async () => {
  if (!form.name) {
    toast.error('Please fill in all required fields.')
    return
  }
  const newConfiguration = {
    name: form.name,
    description: form.description,
    content: JSON.parse(form.content.value),
    ...(configurationId ? { updatedAt: getTimeStamp() } : { createdAt: getTimeStamp() })
  }
  if (configurationId) {
    if (await updateConfiguration(newConfiguration)) {
      router.push('/')
    }
  } else {
    if (await addConfiguration(newConfiguration)) {
      router.push('/')
    }
  }
}
const text = `${configurationId ? 'Edit' : 'Add'} Configuration`
</script>
<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">{{ text }}</h2>

          <div class="mb-4">
            <label for="name" class="block text-gray-700 font-bold mb-2">Configuration Name</label>
            <input
              type="text"
              v-model="form.name"
              id="name"
              name="name"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Temperature Sensor"
              required
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add a description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="content" class="block text-gray-700 font-bold mb-2">Content</label>
            <JsonEditorVue v-model="form.content.value" />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {{ text }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
