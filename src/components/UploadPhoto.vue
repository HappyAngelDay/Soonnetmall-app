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

        <!-- 有 aspect-square（即有相片）才顯示上傳按鈕 -->
        <div class="upload-footer" v-if="photos.length > 0">
            <select class="w-full border rounded px-3 py-2 mb-4 text-gray-600" v-model="selectedPrice"
                :class="{ 'price-error': showPriceError }">
                <option disabled value="">請選擇相片單價</option>
                <option>$10</option>
                <option>$20</option>
            </select>
            <button class="upload" v-if="!uploading" @click="submitUpload">
                上傳照片
            </button>
            <button class="stopUpload" v-else @click="stopUpload">
                停止上傳
            </button>
            <!-- 上傳中遮罩層與進度條 -->
            <div v-if="uploading" class="upload-overlay">
            <div class="upload-progress-box">
                <div class="progress-bar-outer">
                    <span class="progress-percent">
                        上傳相片中 {{ currentPhotoIndex }} / {{ photos.length }}
                    </span>

                    <div class="progress-bar-inner" :style="{ width: progress + '%' }"></div>
                </div>
            </div>
            </div>
        </div>

    </div>


</template>

<script setup>
import { ref, watch, computed } from 'vue'

// ✅ 單價選擇（由使用者輸入或選擇）
const selectedPrice = ref('')

// ✅ 接收來自父層的 props（包括相片陣列與所選活動）
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

// ✅ 宣告事件（讓子元件可以通知父層更新相片）
const emit = defineEmits(['update:photos'])

// ✅ 本地相片狀態（初始化為 props.photos 的拷貝）
const photos = ref([...props.photos])

// ✅ 上傳中狀態，用於遮罩顯示或 loading 狀態控制
const uploading = ref(false)
const progress = ref(0)
let uploadInterval = null

// ✅ 控制 <input type="file"> 的 DOM 引用
const fileInput = ref(null)

// ✅ 顯示單價錯誤提示用（例如紅框）
const showPriceError = ref(false)

// ✅ 父層 props 更新時，同步覆寫本地 photos
watch(
    () => props.photos,
    (val) => {
        if (Array.isArray(val)) photos.value = [...val]
    }
)

// ✅ 本地 photos 更新時，自動 emit 給父層
watch(photos, (val) => {
    emit('update:photos', val)
})

// ✅ 計算是否允許上傳（必須選了活動與單價）
const canUpload = computed(() => {
    return props.selectedEvent && selectedPrice.value
})

// ✅ 嘗試上傳時的邏輯（檢查有冇選單價）
function onTryUpload() {
    if (!selectedPrice.value) {
        showPriceError.value = true
        setTimeout(() => {
            showPriceError.value = false
        }, 1500)
        return
    }
    submitUpload()
}

// ✅ 開始模擬上傳（你可以在這裡觸發真正上傳 API）
function submitUpload() {
    uploading.value = true
    progress.value = 0
    clearInterval(uploadInterval)

    uploadInterval = setInterval(() => {
        if (progress.value >= 100) {
            clearInterval(uploadInterval)
            setTimeout(() => {
                uploading.value = false
                progress.value = 0
            }, 400)
        } else {
            progress.value += 10
        }
    }, 200)
}

const currentPhotoIndex = computed(() => {
    if (photos.value.length === 0) return 0
    return Math.min(
        photos.value.length,
        Math.ceil((progress.value / 100) * photos.value.length)
    )
})

// ✅ 觸發檔案選擇（模擬點擊 <input type="file">）
function triggerFileInput() {
    if (fileInput.value) fileInput.value.click()
}

// ✅ 當使用者選擇圖片檔案後的處理邏輯
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

    // 重設 input 的值，確保可再次選同一張圖
    event.target.value = ''
}

function stopUpload() {
    uploading.value = false
    clearInterval(uploadInterval)
    progress.value = 0
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


.upload {
    background-color: #4CAF50;
    color: white;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.price-error {
    border: red 1px solid !important;
}

.stopUpload {
    background-color: #a8a8a8;
    color: white;
    padding: 5px 20px;
    border: none;
    z-index: 1000;
    position: absolute;
    right: 10px;
}

.progress-bar-outer {
    width: 100%;
    height: 48px;
    background: #f5f5f5;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between !important;
    position: absolute;
    left: 0;
    bottom: 0;
}

.progress-bar-inner {
    position: absolute;
    top: 0;
    height: 10%;
    transition: width 0.2s;
    background: #16a34a;
}

.progress-percent {
    width: 100%;
    text-align: left;
    font-size: 13px;
    color: #222;
    padding: 4px 20px;
}

.progress-label {
    margin-top: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #222;
    letter-spacing: 2px;
}

.upload-progress-box {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    left: 0;
    bottom: 61px;
    background: rgba(0, 0, 0, 0.4);
}
</style>
