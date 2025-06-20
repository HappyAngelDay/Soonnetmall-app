<template>
    <AppHeader />
    <div class="app-contact">
        <EventInfo v-if="activity" :activity="activity" />
        <PhotoGrid v-if="activity && activity.photos.length" :photos="activity.photos" />
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

const route = useRoute()
const activityId = Number(route.params.id)
const activity = activities.find(a => a.id === activityId)
// 取得該活動的相片陣列
const photoEntry = photosData.find(p => p.id === activityId)
if (activity && photoEntry) {
    activity.photos = photoEntry.photos
} else if (activity) {
    activity.photos = []
}
</script>

<style scoped>

</style>
