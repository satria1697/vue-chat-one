<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import MiButton from '@/components/global/MiButton.vue'
import dayjs from 'dayjs'
import { v4 as uuidV4 } from 'uuid'
import { IMessage } from '@/entities/message'
import MessageGroup from '@/views/component/MessageGroup.vue'

import LocalStorage from '@/service/local-storage'
import ModalInsertName from '@/views/component/ModalInsertName.vue'
import MiInput from '@/components/global/MiInput.vue'
const localStorage = new LocalStorage()

interface IData {
  inputMessage: string
  message: Array<IMessage>
  isLoadMore: boolean
  sender: {
    name: string
    uuid: string
  }
  page: number
  error: boolean
}

interface IChannelMessage {
  shouldGetData: boolean
}

const channel = new BroadcastChannel('message-channel')

channel.addEventListener('message', (ev) => {
  const channelMessage: IChannelMessage = ev.data
  if (channelMessage.shouldGetData) {
    getAllMessage()
    scrollToBottomChat()
  }
})

const data = reactive<IData>({
  inputMessage: '',
  message: localStorage.getAllMessage().data,
  isLoadMore: localStorage.getAllMessage().isLoadMore,
  sender: {
    name: '',
    uuid: uuidV4()
  },
  page: 1,
  error: false
})

const messageWrapper = ref<HTMLElement | null>(null)

onMounted(() => {
  scrollToBottomChat()
})

const getAllMessage = () => {
  const value = localStorage.getAllMessage(data.page)
  data.message = value.data
  data.isLoadMore = value.isLoadMore
}

const scrollToBottomChat = () => {
  setTimeout(() => {
    if (messageWrapper.value) {
      messageWrapper.value.scrollTop = messageWrapper.value.scrollHeight
    }
  }, 150)
}

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
    getAllMessage()
    channel.postMessage({
      shouldGetData: true
    })
    scrollToBottomChat()
  }
}

const setName = (name: string) => {
  data.sender.name = name
}

const loadMore = () => {
  data.page += 1
  getAllMessage()
}
</script>

<template>
  <modal-insert-name @input="(name) => setName(name)" />
  <div class="m-4 max-w-2xl">
    <div class="bg-primary rounded-md p-1.5">
      <span class="text-white">Chat</span>
    </div>
    <div
      ref="messageWrapper"
      class="h-[30rem] flex flex-col overflow-y-auto overflow-x-hidden relative"
    >
      <div v-if="data.isLoadMore" class="absolute mx-auto text-center left-0 right-0 top-3 w-fit">
        <mi-button length="fit" @click="() => loadMore()">
          <span>Load More</span>
        </mi-button>
      </div>
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
      <mi-input v-model="data.inputMessage" />
      <mi-button
        text-position="middle"
        size="small"
        text="Send"
        @click="sendMessage(data.inputMessage)"
      />
    </form>
  </div>
</template>
