<template>
  <v-dialog v-model="dialog" persistent width="100%">
    <v-card>
      <v-date-picker v-model="innerDate" @update:modelValue="onSelect" />
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="close">確定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue', 'close'])

const dialog = ref(true)
const innerDate = ref(props.modelValue)

watch(() => props.modelValue, val => { innerDate.value = val })

function onSelect(val) {
  emit('update:modelValue', val)
}
function close() {
  emit('update:modelValue', innerDate.value)
  emit('close')
  dialog.value = false
}
</script>
