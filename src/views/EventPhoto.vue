<template>
    <AppHeader />
    <div class="app-contact">
        <EventInfo v-if="activity" :activity="activity" :displayUploadCount="displayUploadCount" />
        <PhotoGrid v-if="activity && activity.photos.length" :photos="activity.photos" @update-count="displayUploadCount = $event" />
    </div>
    <FooterMenu />
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue';
import FooterMenu from '../components/FooterMenu.vue';
import EventInfo from '../components/EventInfo.vue';
import activities from '../data/activities.js'
import PhotoGrid from '../components/PhotoGrid.vue';
import photosData from '../data/photos.js'
import { ref } from 'vue'

const route = useRoute()
const activityId = Number(route.params.id)
const activity = activities.find(a => a.id === activityId)
const displayUploadCount = ref(0)
// 取得該活動的相片陣列
const photoEntry = photosData.find(p => p.id === activityId)
if (activity && photoEntry) {
    activity.photos = photoEntry.photos
    displayUploadCount.value = photoEntry.photos.length
} else if (activity) {
    activity.photos = []
    displayUploadCount.value = 0
}
</script>

<style scoped>
/* ...existing code... */
</style>
