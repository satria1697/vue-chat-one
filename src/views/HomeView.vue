<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import dayjs from 'dayjs'
import { v4 as uuidV4 } from 'uuid'
import { IMessage } from '@/entities/message'
import MessageGroup from '@/views/MessageGroup.vue'

import LocalStorage from '@/service/local-storage'
const localStorage = new LocalStorage()

interface IData {
  inputMessage: string
  message: Array<IMessage>
  sender: {
    name: string
    uuid: string
  }
  isSubmitted: {
    name: boolean
  }
}

// const senderId = uuidV4()

const data = reactive<IData>({
  inputMessage: '',
  message: localStorage.getAllMessage(),
  sender: {
    name: '',
    uuid: uuidV4()
  },
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
      sender: data.sender.name,
      senderID: data.sender.uuid
    }
    localStorage.addMessage(messageDetails)
    data.inputMessage = ''
    data.message = localStorage.getAllMessage()
  }
}

const inputName = (name: string) => {
  if (name) {
    data.sender.name = name
    data.isSubmitted.name = true
  }
}
</script>

<template>
  <div v-if="!data.isSubmitted.name" class="fixed top-0 bg-gray-800 bg-opacity-70 w-full h-screen">
    <div class="grid place-items-center max-w-2xl h-[30rem]">
      <div class="bg-white flex flex-col p-4">
        <span>Please enter your name</span>
        <form @submit.prevent="() => inputName(data.sender.name)">
          <input v-model="data.sender.name" class="border-primary border-2 rounded-md p-1.5" />
        </form>
      </div>
    </div>
  </div>
  <div class="m-4 max-w-2xl">
    <div class="bg-primary rounded-md p-1.5">
      <span class="text-white">Chat</span>
    </div>
    <div class="h-[30rem] flex flex-col overflow-y-auto">
      <message-group
        v-for="i in data.message"
        :key="i.uuid"
        :sender-id="data.sender.uuid"
        :data="i"
      />
    </div>
    <form
      class="bg-primary grid grid-cols-[9fr,1fr] space-x-4 rounded-md p-1.5"
      @submit.prevent="sendMessage(data.inputMessage)"
    >
      <input v-model="data.inputMessage" class="p-1.5" autofocus />
      <mi-button size="small" text="send" @click="sendMessage(data.inputMessage)" />
    </form>
  </div>
</template>
