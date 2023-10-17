<script setup lang="ts">
import { PropType } from 'vue'
import { IMessage } from '@/entities/message'
import MessageAvatar from '@/views/component/MessageAvatar.vue'
import MessageBubble from '@/views/component/MessageBubble.vue'

defineProps({
  data: {
    type: Object as PropType<IMessage>,
    required: true
  },
  senderId: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    v-if="data.senderID == senderId"
    class="mx-4 my-2 grid grid-cols-[1fr,2.5rem] items-center justify-items-end"
  >
    <message-bubble :data="data" />
    <message-avatar :data="data" />
  </div>

  <div v-else class="mx-4 my-2 grid grid-cols-[2.5rem,1fr] items-center">
    <message-avatar :data="data" />
    <message-bubble :data="data" />
  </div>
</template>
