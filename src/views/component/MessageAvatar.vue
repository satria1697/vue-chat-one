<script setup lang="ts">
import MiIcon from '@/components/global/MiIcon.vue'
import { PropType } from 'vue'
import { IMessage } from '@/entities/message'

defineProps({
  data: {
    type: Object as PropType<IMessage>,
    required: true
  }
})
</script>

<template>
  <div class="relative group">
    <mi-icon icon="mdi:account-circle" size="text-4xl" />
    <span
      class="invisible group-hover:visible text-white bg-gray-800 p-0.5 rounded-md text-xs absolute -top-2 left-5"
      >{{ data.sender }}</span
    >
  </div>
</template>
