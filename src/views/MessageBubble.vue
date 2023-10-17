<script setup lang="ts">
import { PropType } from 'vue'
import { IMessage } from '@/entities/message'
import dayjs from 'dayjs'
import MiIcon from '@/components/global/MiIcon.vue'

defineProps({
  data: {
    type: Object as PropType<IMessage>,
    required: true
  }
})

const formatIsoToHour = (isoDate: string): string => {
  return dayjs(isoDate).format('HH:mm')
}

const formatIsoToDate = (isoDate: string): string => {
  return dayjs(isoDate).format('DD/MM/YYYY, HH:mm')
}
</script>

<template>
  <div class="mx-4 my-2 grid grid-cols-[3rem,1fr] items-center">
    <div class="relative group">
      <mi-icon icon="mdi:account-circle" size="text-4xl" />
      <span
        class="invisible group-hover:visible text-white bg-gray-800 p-0.5 rounded-md text-xs absolute -top-2 left-5"
        >{{ data.sender }}</span
      >
    </div>
    <div class="flex flex-col">
      <div class="min-h-[2.5rem] bg-tertiary max-w-prose w-fit rounded-md p-1.5">
        <div class="">
          <span class="text-white">{{ data.message }}</span>
        </div>
        <span class="text-white text-xs float-right">{{ formatIsoToHour(data.time) }}</span>
      </div>
    </div>
  </div>
</template>
