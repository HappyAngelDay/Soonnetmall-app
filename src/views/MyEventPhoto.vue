<template>
    <!-- <AppHeader /> -->
    <TopFunctionBar />
    <div class="page-container">
        <div
            v-for="event in events"
            :key="event.id"
            class="photo-card"
            @click="goToPhotographerPhotos(event)"
            style="cursor:pointer"
        >
            <img :src="event.cover" alt="封面" class="w-full aspect-square object-cover" />
            <div class="mt-2 event-title">{{ event.title }}</div>
            <div class="text-sm">上傳張數：{{ event.count }}</div>
        </div>
    </div>
    <FooterMenu />
</template>

<script setup>
import events from '../data/records.js'
import TopFunctionBar from '../components/TopFunctionBar.vue'
import FooterMenu from '../components/FooterMenu.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goToPhotographerPhotos(event) {
    // photographerId 寫死 PH001，event.id 為活動 id
    router.push({
        name: 'EventPhoto',
        params: { id: event.id },
        query: { photographerId: 'PH001' }
    })
}
</script>

<style scoped>
.page-container {
    display: flex;
    padding: 10px;
    gap: 5px;
}

.page-container .photo-card {
    width: 50%;
    text-align: left;
}

.page-container .photo-card img {
    border-radius: 10px;
}
</style>
