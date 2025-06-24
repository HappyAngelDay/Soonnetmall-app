<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="100%"
    attach=".frame-content"
    scrollable
  >
    <v-card>
      <v-date-picker
        v-model="innerDate"
        :allowed-dates="allowedDates"
        @update:modelValue="onSelect"
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import activities from '../data/activities.js'
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue', 'close'])

const dialog = ref(true)
const innerDate = ref(props.modelValue)

watch(() => props.modelValue, val => { innerDate.value = val })

function allowedDates(dateStr) {
  // 只允許今天或今天之前的日子可選
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date <= today
}

function onSelect(val) {
  emit('update:modelValue', val)
  emit('close')
  dialog.value = false
}

function close() {
  emit('update:modelValue', innerDate.value)
  emit('close')
  dialog.value = false
}
</script>
