<template>
    <!-- <AppHeader /> -->
    <TopFunctionBar />
    <div class="page-container">
        <div v-for="event in events" :key="event.id" class="event-card">
            <img :src="event.cover" alt="封面" class="w-full aspect-square object-cover" />
            <div class="mt-2 font-bold">{{ event.title }}</div>
            <div class="text-sm">上傳張數：{{ event.count }}</div>
        </div>
    </div>
    <FooterMenu />
</template>

<script setup>
import events from '../data/records.js'
import TopFunctionBar from '../components/TopFunctionBar.vue'
import FooterMenu from '../components/FooterMenu.vue'
</script>

<style scoped>
.page-container {
    display: flex;
    padding: 10px;
    gap: 5px;
}

.event-card {
    width: 50%;
    text-align: left;
}

</style>
