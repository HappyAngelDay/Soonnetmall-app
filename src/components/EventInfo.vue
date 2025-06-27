<template>
  <div class="event-info">
    <h2 class="title">{{ activity.name }}</h2>
    <ul :class=" [
      'info-list',
      photographerId ? 'info-list-photographerId' : ''
    ]">
      <template v-if="photographerId">
        <div>
          <li>上傳日期: {{ uploadDate }}</li>
          <li>上傳張數: {{ displayUploadCount }}</li>
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
          <li>相片總數: {{ displayUploadCount }}</li>
          <div class="identify-info">
            <li>已識別: {{ recognized }}</li>
            <li>未識別: {{ unrecognized }}</li>
            <li>無法辨識: {{ unidentified }}</li>
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
import { computed, ref } from 'vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
  displayUploadCount: {
    type: Number,
    default: undefined
  }
})

const route = useRoute()
const router = useRouter()
const photographerId = route.query.photographerId

const uploadPhotos = computed(() => {
  if (!photographerId || !props.activity.photos) return []
  return props.activity.photos.filter(p => p.photographerId === photographerId)
})

const uploadCount = computed(() => uploadPhotos.value.length)

const displayUploadCount = computed(() => {
  return typeof props.displayUploadCount === 'number'
    ? Math.max(props.displayUploadCount, 0)
    : uploadCount.value
})

const uploadDate = computed(() => {
  if (!uploadPhotos.value.length) return props.activity.date
  const timestamps = uploadPhotos.value.map(p => p.timestamp).filter(Boolean)
  if (!timestamps.length) return props.activity.date
  const minTs = Math.min(...timestamps)
  const d = new Date(minTs)
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
})

const photoPrice = computed(() => {
  if (!uploadPhotos.value.length) return '$100'
  const price = uploadPhotos.value[0].price
  return price ? `$${price}` : '$100'
})

const soldCount = computed(() => {
  return uploadPhotos.value.filter(p => p.sold).length
})

const albumRevenue = computed(() => {
  const soldPhotos = uploadPhotos.value.filter(p => p.sold)
  if (!soldPhotos.length) return '$0'
  let sum = 0
  soldPhotos.forEach(p => {
    sum += Number(p.price) || 100
  })
  return '$' + sum
})

// 動態計算已識別、未識別、無法辨識，總和等於 displayUploadCount
const recognized = computed(() => {
  // 預設比總數少 2，最少 0
  return Math.max(0, displayUploadCount.value - 2)
})
const unrecognized = computed(() => {
  // 預設 1
  return displayUploadCount.value > 0 ? 1 : 0
})
const unidentified = computed(() => {
  // 剩餘補齊
  return Math.max(0, displayUploadCount.value - recognized.value - unrecognized.value)
})

function goToUpload() {
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
