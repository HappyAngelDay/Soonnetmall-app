<template>
  <AppHeader />
  <div class="page-title">
    <h2 class="title">攝手專區</h2>
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
    <UploadPhoto/>


    <div class="upload-footer">
      <v-btn color="grey" @click="stopUpload">停止上傳</v-btn>
      <v-btn color="success" @click="submitUpload">上傳照片</v-btn>
    </div>
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

const selectedEvent = ref('')
const showActivityDropdown = ref(false)
const selectedPrice = ref('')
const photos = ref([])

const showDatePicker = ref(false)
const selectedDate = ref('')

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
  photos.value = []
}

function submitUpload() {
  alert('上傳成功！總共 ' + photos.value.length + ' 張')
}

function handleDateSelect(date) {
  selectedDate.value = date
  showDatePicker.value = false
  // 換日期時清空活動選擇
  selectedEvent.value = ''
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

.frame-content {
  position: relative;
  padding: 10px;
  height: calc(100vh - 387px);
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
</style>