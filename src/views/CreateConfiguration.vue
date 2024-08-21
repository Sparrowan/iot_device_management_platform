<script setup lang="ts">
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import JsonEditorVue from 'json-editor-vue'
import { useConfigurationStore } from '../stores/configuration'
import { useRouter } from 'vue-router'

const configurationStore = useConfigurationStore()

const form = reactive({
  name: '',
  description: '',
  content: { value: '' }
})

const { fetchConfigurations, addConfiguration } = configurationStore

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
    content: JSON.parse(form.content.value)
  }
  if (await addConfiguration(newConfiguration)) {
    router.push('/')
  }
}
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Configuration</h2>

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
              Add Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
