<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import dayjs from 'dayjs'
import { v4 as uuidV4 } from 'uuid'
import { IMessage } from '@/entities/message'
import MessageBubble from '@/views/MessageBubble.vue'

interface IData {
  inputMessage: string
  message: Array<IMessage>
  name: string
  isSubmitted: {
    name: boolean
  }
}

const data = reactive<IData>({
  inputMessage: '',
  message: [],
  name: '',
  isSubmitted: {
    name: false
  }
})

const sendMessage = (message: string) => {
  if (message) {
    const messageDetails: IMessage = {
      message,
      uuid: uuidV4(),
      time: dayjs().toISOString(),
      sender: data.name
    }
    data.message.push(messageDetails)
    data.inputMessage = ''
  }
}

const inputName = (name: string) => {
  if (name) {
    data.name = name
    data.isSubmitted.name = true
  }
}
</script>

<template>
  <div v-if="!data.isSubmitted.name" class="fixed top-0 bg-gray-800 bg-opacity-70 w-full h-screen">
    <div class="grid place-items-center max-w-2xl h-[30rem]">
      <div class="bg-white flex flex-col p-4">
        <span>Please enter your name</span>
        <form @submit.prevent="() => inputName(data.name)">
          <input v-model="data.name" class="border-primary border-2 rounded-md p-1.5" />
        </form>
      </div>
    </div>
  </div>
  <div class="m-4 max-w-2xl">
    <div class="bg-primary rounded-md p-1.5">
      <span class="text-white">Chat</span>
    </div>
    <div class="h-[30rem] flex flex-col overflow-y-auto">
      <message-bubble v-for="i in data.message" :key="i.uuid" :data="i" />
    </div>
    <form
      class="bg-primary grid grid-cols-[9fr,1fr] space-x-4 rounded-md p-1.5"
      @submit.prevent="sendMessage(data.inputMessage)"
    >
      <input v-model="data.inputMessage" />
      <mi-button size="small" text="send" @click="sendMessage(data.inputMessage)" />
    </form>
  </div>
</template>
