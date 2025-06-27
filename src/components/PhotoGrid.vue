<template>
  <div class="photo-grid">
    <PhotoCard
      v-for="photo in visiblePhotos"
      :key="photo.id"
      :photo="photo"
      @delete-photo="handleDeletePhoto"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PhotoCard from './PhotoCard.vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true
  }
})

// 用於追蹤已刪除的 photo id
const deletedIds = ref([])

const visiblePhotos = computed(() =>
  props.photos.filter(photo => !deletedIds.value.includes(photo.id))
)

// 通知父層（如 EventInfo）目前顯示的相片數
const emit = defineEmits(['update-count'])

function handleDeletePhoto(id) {
  deletedIds.value.push(id)
  emit('update-count', visiblePhotos.value.length)
}
</script>

<style scoped>
.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 10px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 10px;
}
</style>
