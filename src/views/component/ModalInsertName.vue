<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
  (event: 'input', name: string): void
}>()

const data = reactive({
  name: '',
  isSubmitted: false
})

const inputName = (name: string) => {
  if (name) {
    data.name = name
    data.isSubmitted = true
    emit('input', name)
  }
}
</script>

<template>
  <div v-if="!data.isSubmitted" class="fixed top-0 bg-gray-800 bg-opacity-70 w-full h-screen z-50">
    <div class="grid place-items-center max-w-2xl h-[30rem]">
      <div class="bg-white flex flex-col p-4">
        <span>Please enter your name</span>
        <form @submit.prevent="() => inputName(data.name)">
          <input v-model="data.name" class="border-primary border-2 rounded-md p-1.5" />
        </form>
      </div>
    </div>
  </div>
</template>
