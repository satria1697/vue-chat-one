<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import MiInput from '@/components/global/MiInput.vue'

const emit = defineEmits<{
  (event: 'input', name: string): void
}>()

const data = reactive({
  name: '',
  isSubmitted: false,
  error: false
})

const inputName = (name: string) => {
  if (name) {
    data.name = name
    data.isSubmitted = true
    emit('input', name)
    return
  }
  data.error = true
}
</script>

<template>
  <div v-if="!data.isSubmitted" class="fixed top-0 bg-gray-800 w-full h-screen z-50">
    <div class="grid place-items-center max-w-2xl h-[30rem]">
      <div class="bg-white flex flex-col p-4 space-y-3">
        <div class="flex flex-col">
          <span class="font-semibold text-xl">Welcome to Retract Chat</span>
          <span class="text-sm text-gray-600">Please enter your name to Chat</span>
        </div>
        <form class="flex flex-col space-y-2.5" @submit.prevent="() => inputName(data.name)">
          <mi-input
            v-model="data.name"
            :is-error="data.error"
            error-message="Name can't be empty"
          />
          <mi-button length="full" text-position="middle" text="Enter" />
        </form>
      </div>
    </div>
  </div>
</template>
