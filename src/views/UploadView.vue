<template>
  <AppHeader />
  <div class="frame-content">
    <v-container>
      <v-select
        label="請選擇活動日期"
        :model-value="selectedDateDisplay"
        readonly
        @click="showDatePicker = true"
      />
      <v-select label="請選擇活動" :items="['活動 A', '活動 B']" v-model="selectedEvent" />
      <v-select label="請選擇相片單價" :items="['$10', '$20', '$30']" v-model="selectedPrice" />

      <v-row>
        <v-col v-for="(photo, index) in photos" :key="index" cols="4">
          <v-img :src="photo" aspect-ratio="1" class="rounded" />
        </v-col>
      </v-row>

      <div class="upload-footer">
        <v-btn color="grey" @click="stopUpload">停止上傳</v-btn>
        <v-btn color="success" @click="submitUpload">上傳照片</v-btn>
      </div>

      <DatePicker
        v-if="showDatePicker"
        v-model="selectedDate"
        @close="showDatePicker = false"
        attach=".frame-content"
      />
    </v-container>
  </div>
  <footer-menu />
</template>

<script setup>
import { ref, computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'
import DatePicker from '../components/DatePicker.vue'

const selectedEvent = ref('')
const selectedPrice = ref('')
const photos = ref([])

const showDatePicker = ref(false)
const selectedDate = ref('')

// 顯示 YYYY/MM/DD（自動處理 Date 物件或字串）
const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return ''
  if (typeof selectedDate.value === 'string' && selectedDate.value.length === 8) {
    // 20250617 -> 2025/06/17
    return `${selectedDate.value.slice(0,4)}/${selectedDate.value.slice(4,6)}/${selectedDate.value.slice(6,8)}`
  }
  // 若為 Date 物件或其他格式
  const d = new Date(selectedDate.value)
  if (isNaN(d)) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
})

function addPhoto() {
  // 示意用 placeholder，實際應該配合 file input 或上傳 API
  photos.value.push('https://via.placeholder.com/150')
}

function stopUpload() {
  photos.value = []
}

function submitUpload() {
  alert('上傳成功！總共 ' + photos.value.length + ' 張')
}
</script>

<style scoped>
.v-container {
  margin-top: 80px;
  padding: 20px !important
}

.frame-content {
  position: relative;
  width: 100%;
  height: 100%;
  /* 如需限制高度可加 max-height 或 overflow */
}

.upload-footer {
  position: absolute;
  bottom: 80px;
  display: flex;
  gap: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.v-dialog *{  
  margin: 0px !important;
  max-width: 100% !important;
}

</style>
