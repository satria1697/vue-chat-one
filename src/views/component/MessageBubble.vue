<script setup lang="ts">
import { PropType } from 'vue'
import { IMessage } from '@/entities/message'
import dayjs from 'dayjs'

defineProps({
  data: {
    type: Object as PropType<IMessage>,
    required: true
  },
  isSender: {
    type: Boolean,
    default: false
  }
})

const formatIsoToHour = (isoDate: string): string => {
  return dayjs(isoDate).format('HH:mm')
}
</script>

<template>
  <div class="flex flex-col space-y-0.5">
    <span class="text-xs" :class="isSender ? 'self-end' : ''">{{ data.sender }}</span>
    <div class="min-h-[2.5rem] bg-tertiary max-w-prose w-fit rounded-md p-1.5">
      <div class="">
        <span class="text-white">{{ data.message }}</span>
      </div>
      <span class="text-white text-xs float-right">{{ formatIsoToHour(data.time) }}</span>
    </div>
  </div>
</template>
