<template>
  <div class="photo-grid">
    <PhotoCard v-for="photo in photos" :key="photo.id" :photo="photo" />
  </div>
</template>

<script setup>
import PhotoCard from './PhotoCard.vue';

const props = defineProps({
  photos: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 10px;
}
</style>
