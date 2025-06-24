<template>
    <div class="uploadphoto-grid">
        <!-- 每張已選圖片 -->
        <div v-for="(img, index) in photos" :key="index" class="aspect-square">
            <img :src="img" class="w-full h-full object-cover" />
        </div>

        <!-- 加號格子 -->
        <div class="addPhoto" @click="triggerFileInput">
            +
            <input style="display: none;" ref="fileInput" type="file" accept="image/*" class="hidden" multiple
                @change="handleFileUpload" />
        </div>


        <!-- 有相片才顯示上傳按鈕 -->
        <div class="upload-footer" v-if="photos.length > 0">
            <select
                class="w-full border rounded px-3 py-2 mb-4 text-gray-600"
                v-model="selectedPrice"
                :class="{ 'price-error': showPriceError }"
            >
                <option disabled value="">請選擇相片單價</option>
                <option>$10</option>
                <option>$20</option>
            </select>
            <button
                class="submitUpload"
                v-if="!uploading"
                @click="onTryUpload"
                :disabled="!canUpload"
            >
                上傳照片
            </button>
            <button class="stopUpload" v-else @click="stopUpload">
                停止上傳
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const selectedPrice = ref('')
const props = defineProps({
    photos: {
        type: Array,
        default: () => []
    },
    selectedEvent: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:photos'])

const photos = ref([...props.photos])
const uploading = ref(false)
const fileInput = ref(null)
const showPriceError = ref(false)

// 父層 v-model:photos 雙向綁定
watch(
    () => props.photos,
    (val) => {
        if (Array.isArray(val)) photos.value = [...val]
    }
)
watch(photos, (val) => {
    emit('update:photos', val)
})

const canUpload = computed(() => {
    return props.selectedEvent && selectedPrice.value
})

function onTryUpload() {
    if (!selectedPrice.value) {
        showPriceError.value = true
        setTimeout(() => { showPriceError.value = false }, 1500)
        return
    }
    submitUpload()
}

function submitUpload() {
    uploading.value = true
    setTimeout(() => {
        alert('上傳成功！總共 ' + photos.value.length + ' 張')
        uploading.value = false
    }, 1000)
}

function stopUpload() {
    uploading.value = false
    photos.value = []
}


function triggerFileInput() {
    if (fileInput.value) fileInput.value.click()
}

function handleFileUpload(event) {
    const files = event.target.files
    if (!files || !files.length) return

    Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = e => {
            photos.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
    })

    // 清除 input 以允許重複選同一張圖
    event.target.value = ''
}
</script>

<style scoped>
.uploadphoto-grid {
    margin-top: 10px;
    margin-bottom: 50px;
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


.upload-footer {
    position: fixed;
    left: 0px;
    bottom: 60px;
    width: calc(100% - 20px) !important;
    height: 30px;
    padding: 10px;
    background-color: #f5f5f5;
    gap: 12px;
    justify-content: space-between !important;
}


.submitUpload {
    background-color: #4CAF50;
    color: white;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.stopUpload {
    background-color: #f44336;
    color: white;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.price-error {
    border: red 1px solid !important;
}
</style>
