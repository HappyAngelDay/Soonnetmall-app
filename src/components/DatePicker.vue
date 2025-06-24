<template>
  <VueDatePicker
    v-model="selectedDate"
    :enable-time-picker="false"
    locale="zh-TW"
    placeholder="請選擇日期"
    :auto-apply="true"
    :disabled-dates="props.disabledDates"
    @update:model-value="onDateSelected"
  />
</template>

<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// ✅ 接收外部傳入的禁用邏輯
const props = defineProps({
  disabledDates: {
    type: Function,
    default: () => false
  }
})

const selectedDate = ref(null)
const emit = defineEmits(['update-date'])

// 將選擇的日期轉換並 emit
function toYYYYMMDD(val) {
  if (!val) return ''
  if (typeof val === 'string') {
    if (/^\\d{8}$/.test(val)) return val
    if (/^\\d{4}[-/]\\d{2}[-/]\\d{2}$/.test(val)) {
      const parts = val.split(/[-/]/)
      return parts[0] + parts[1] + parts[2]
    }
    return ''
  }
  const d = new Date(val)
  if (!isNaN(d)) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}${m}${day}`
  }
  return ''
}

function onDateSelected(date) {
  emit('update-date', toYYYYMMDD(date))
}
</script>
