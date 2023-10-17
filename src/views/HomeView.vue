<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'

interface IData {
  inputMessage: string
}

const data = reactive<IData>({
  inputMessage: ''
})
</script>

<template>
  <div class="m-4 max-w-2xl">
    <div class="bg-primary rounded-md p-1.5">
      <span class="text-white">Chat</span>
    </div>
    <div class="h-[30rem] flex flex-col overflow-y-scroll">
      <div v-for="i in 25" :key="i">asd</div>
    </div>
    <div class="bg-primary grid grid-cols-[9fr,1fr] space-x-4 rounded-md p-1.5">
      <input v-model="data.inputMessage" />
      <mi-button size="small" text="send" />
    </div>
  </div>
</template>
