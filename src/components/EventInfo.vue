<template>
  <div class="event-info">
    <h2 class="title">{{ activity.name }}</h2>
    <ul :class="[
      'info-list',
      photographerId ? 'info-list-photographerId' : ''
    ]">
      <template v-if="photographerId">
        <div>
          <li>上傳日期: {{ uploadDate }}</li>
          <li>上傳張數: {{ uploadCount }}</li>
          <li>照片定價: {{ photoPrice }}</li>
          <li>已售照片: {{ soldCount }}</li>
          <li>相簿收益: {{ albumRevenue }}</li>
        </div>
        <div class="photo-actions">
          <button class="upload" @click="goToUpload">上傳相片</button>
          <button class="del"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
      </template>
      <template v-else>
        <div>
          <li>攝影師: {{ activity.totalPhotographer }}</li>
          <li>相片總數: {{ activity.totalPhotos }}</li>
          <div class="identify-info">
            <li>已識別: {{ activity.recognized }}</li>
            <li>未識別: {{ activity.unrecognized }}</li>
            <li>無法辨識: {{ activity.unidentified }}</li>
          </div>
        </div>
        <Countdown />
      </template>
    </ul>
  </div>
</template>

<script setup>
import Countdown from './Countdown.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const photographerId = route.query.photographerId

// 假設 activity.photos 有 photographerId 欄位
const uploadPhotos = computed(() => {
  if (!photographerId || !props.activity.photos) return []
  return props.activity.photos.filter(p => p.photographerId === photographerId)
})

const uploadCount = computed(() => uploadPhotos.value.length)

const uploadDate = computed(() => {
  if (!uploadPhotos.value.length) return props.activity.date
  // 取最早一張的 timestamp
  const timestamps = uploadPhotos.value.map(p => p.timestamp).filter(Boolean)
  if (!timestamps.length) return props.activity.date
  const minTs = Math.min(...timestamps)
  const d = new Date(minTs)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
})

// 以下為示範資料，實際應根據你的資料結構調整
const photoPrice = computed(() => {
  // 假設所有照片同價，取第一張的 price 欄位
  if (!uploadPhotos.value.length) return '-'
  return uploadPhotos.value[0].price ? `$${uploadPhotos.value[0].price}` : '-'
})
const soldCount = computed(() => {
  // 假設有 sold 屬性為 true 的為已售
  return uploadPhotos.value.filter(p => p.sold).length
})
const albumRevenue = computed(() => {
  // 假設每張已售照片有 price 欄位
  return '$' + uploadPhotos.value.filter(p => p.sold && p.price).reduce((sum, p) => sum + Number(p.price), 0)
})

function goToUpload() {
  // 帶上 photographerId, 日期, 活動名稱
  const activityDate = props.activity.date
  const activityName = props.activity.name
  router.push({
    name: 'Upload',
    query: {
      photographerId: photographerId,
      date: activityDate,
      event: activityName
    }
  })
}
</script>

<style scoped>
.title {
  font-weight: bold;
  font-size: 1.25rem;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.info-list li {
  font-size: 14px;
}

.identify-info {
  color: #9c9c9c;
}

.identify-info li {
  font-size: 12px;
}

.search-bar-custom {
  margin: 0px !important;
  width: calc(100% - 110px) !important;
  padding-bottom: 0%;
}

.photo-actions {
  gap: 5px;
  font-size: 14px;
}

.upload {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
}

.del {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}
</style>
