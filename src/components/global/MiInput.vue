<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  isError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: 'Input Error'
  }
})

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: string): void
}>()
</script>

<template>
  <div class="w-full">
    <input
      :value="modelValue"
      class="p-1.5 w-full border-primary border-2 rounded-md"
      @change="(event) => emit('update:modelValue', (event.target as any).value)"
    />
    <span v-if="isError" class="text-red-600 text-xs">{{ errorMessage }}</span>
  </div>
</template>
