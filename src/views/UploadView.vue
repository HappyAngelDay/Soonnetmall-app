<template>
  <AppHeader />
  <div class="page-title">
  </div>
  <div class="frame-content">
    <div class="px-4">
      <DatePicker :disabled-dates="isDateDisabled" @update-date="handleDateSelect" />

      <!-- 只有選完日期才顯示活動輸入欄 -->
      <div class="relative w-full mt-3" v-if="selectedDate">
        <input type="text" placeholder="請選擇活動" v-model="selectedEvent" readonly @focus="showActivityDropdown = true"
          class="w-full" style="box-sizing: border-box;" />
        <ul v-if="showActivityDropdown && activityOptions.length"
          class="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-48 overflow-auto" @mousedown.prevent>
          <li v-for="option in activityOptions" :key="option" class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            @mousedown.prevent="selectActivity(option)">
            {{ option }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 選完活動才顯示上傳相片區 -->
    <UploadPhoto
      :selectedEvent="selectedEvent"
      v-model:photos="photos"
    />
  </div>

  <footer-menu />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'
import DatePicker from '../components/DatePicker.vue'
import activities from '../data/activities.js'
import UploadPhoto from '../components/UploadPhoto.vue'
const photos = ref([])
const uploading = ref(false)
const progress = ref(0)
let uploadInterval = null

const selectedEvent = ref('')
const showActivityDropdown = ref(false)

const showDatePicker = ref(false)
const selectedDate = ref('')

const uploadSuccess = ref(false)

// 建立活動可用日期清單
const availableDates = computed(() =>
  activities.map(a => {
    const y = parseInt(a.date.slice(0, 4))
    const m = parseInt(a.date.slice(4, 6)) - 1
    const d = parseInt(a.date.slice(6, 8))
    return new Date(y, m, d)
  })
)

// 禁用非活動日期
function isDateDisabled(date) {
  return !availableDates.value.some(d =>
    d.getFullYear() === date.getFullYear() &&
    d.getMonth() === date.getMonth() &&
    d.getDate() === date.getDate()
  )
}

// 根據已選日期，動態產生活動選項
const activityOptions = computed(() => {
  if (!selectedDate.value) return []
  const yyyymmdd = typeof selectedDate.value === 'string' && selectedDate.value.length === 8
    ? selectedDate.value
    : (() => {
      const d = new Date(selectedDate.value)
      if (isNaN(d)) return ''
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}${m}${day}`
    })()
  return activities
    .filter(a => a.date === yyyymmdd)
    .map(a => a.name)
})

const selectedDateDisplay = computed(() => {
  if (!selectedDate.value) return ''
  if (typeof selectedDate.value === 'string' && selectedDate.value.length === 8) {
    return selectedDate.value
  }
  const d = new Date(selectedDate.value)
  if (isNaN(d)) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
})

function addPhoto() {
  photos.value.push('https://via.placeholder.com/150')
}

function stopUpload() {
  uploading.value = false
  photos.value = []
  clearInterval(uploadInterval)
  progress.value = 0
}

function handleDateSelect(date) {
  selectedDate.value = date
  showDatePicker.value = false
  // 換日期時清空活動選擇
  selectedEvent.value = '' // 換日期時清空活動名，但不影響已上傳圖片
}

function selectActivity(option) {
  selectedEvent.value = option
  showActivityDropdown.value = false
}

function handleClickOutside(event) {
  const dropdown = document.querySelector('.relative')
  if (dropdown && !dropdown.contains(event.target)) {
    showActivityDropdown.value = false
  }
}
onMounted(() => {
  window.addEventListener('mousedown', handleClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.v-container {
  margin-top: 80px;
  padding: 20px !important
}

h2.title{
  margin: 15px 0 0 0;
}

.frame-content {
  position: relative;
  padding: 10px;
  height: calc(100vh - 298px);
  overflow: auto;
}

.upload-footer {
  position: fixed;
  left: 0px;
  bottom: 60px;
  width: -webkit-fill-available;
  padding: 10px;
  background-color: #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.relative input {
  width: 100%;
  padding: 10px;
  font-size: 15px;
  box-sizing: border-box;
}

.absolute.overflow-auto {
  margin: 0px;
  padding: 10px;
  list-style: none;
  border: 1px solid #ccc !important;
}

.upload-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-progress-box {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,.12);
  min-width: 260px;
  text-align: center;
}
.progress-bar-outer {
  width: 220px;
  height: 24px;
  border: 2px solid #222;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  margin: 0 auto 10px auto;
  position: relative;
  display: flex;
  align-items: center;
}
.progress-bar-inner {
  background: #16a34a;
  height: 100%;
  border-radius: 16px 0 0 16px;
  transition: width 0.2s;
}
.progress-percent {
  position: absolute;
  right: 18px;
  top: 0;
  height: 24px;
  line-height: 24px;
  font-size: 18px;
  color: #222;
  font-weight: bold;
}
.progress-label {
  margin-top: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #222;
  letter-spacing: 2px;
}
</style>
