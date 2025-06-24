<template>
    <div class="uploadphoto-grid">
        <!-- 每張已選圖片 -->
        <div v-for="(img, index) in photos" :key="index" class="aspect-square">
            <img :src="img" class="w-full h-full object-cover" />
        </div>

        <!-- 加號格子 -->
        <div class="addPhoto" @click="triggerFileInput">
            +
            <input style="display: none;" ref="fileInput" type="file" accept="image/*" class="hidden"
                @change="handleFileUpload" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const photos = ref([])
const fileInput = ref(null)

function triggerFileInput() {
    if (fileInput.value) fileInput.value.click()
}

function handleFileUpload(event) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
        photos.value.push(e.target.result)
    }
    reader.readAsDataURL(file)

    // 清除 input 以允許重複選同一張圖
    event.target.value = ''
}
</script>

<style scoped>
.uploadphoto-grid {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.uploadphoto-grid>div {
    width: calc(50% - 5px);
    aspect-ratio: 1 / 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.addPhoto {
    background: #e3e3e3;
}

.aspect-square>img {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    object-fit: cover;
}
</style>
