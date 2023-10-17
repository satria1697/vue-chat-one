<script setup lang="ts">
import { reactive } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import MiIcon from '@/components/global/MiIcon.vue'
import dayjs from 'dayjs'
import { v4 as uuidV4 } from 'uuid'

interface IMessage {
  uuid: string
  time: string
  message: string
  sender: string
}

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

const formatIsoToHour = (isoDate: string): string => {
  return dayjs(isoDate).format('HH:mm')
}

const formatIsoToDate = (isoDate: string): string => {
  return dayjs(isoDate).format('DD/MM/YYYY, HH:mm')
}
</script>

<template>
  <div v-if="!data.isSubmitted.name" class="fixed top-0 bg-gray-800 bg-opacity-70 w-full h-screen">
    <div class="grid place-items-center max-w-2xl h-[30rem]">
      <div class="bg-white flex flex-col">
        <span>Please enter your name</span>
        <form @submit.prevent="() => inputName(data.name)">
          <input v-model="data.name" />
        </form>
      </div>
    </div>
  </div>
  <div class="m-4 max-w-2xl">
    <div class="bg-primary rounded-md p-1.5">
      <span class="text-white">Chat</span>
    </div>
    <div class="h-[30rem] flex flex-col overflow-y-auto">
      <div
        v-for="i in data.message"
        :key="i.uuid"
        class="mx-4 my-2 grid grid-cols-[3rem,1fr] items-center"
      >
        <div class="relative group">
          <mi-icon icon="mdi:account-circle" size="text-4xl" />
          <span
            class="invisible group-hover:visible text-white bg-gray-800 p-0.5 rounded-md text-xs absolute -top-2 left-5"
            >{{ i.sender }}</span
          >
        </div>
        <div class="flex flex-col">
          <div class="min-h-[2.5rem] bg-tertiary max-w-prose w-fit rounded-md p-1.5">
            <div class="">
              <span class="text-white">{{ i.message }}</span>
            </div>
            <span class="text-white text-xs float-right">{{ formatIsoToHour(i.time) }}</span>
          </div>
        </div>
      </div>
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
