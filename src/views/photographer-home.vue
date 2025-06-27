<template>
    <!-- <AppHeader /> -->
    <TopFunctionBar />
    <div class="frame-content">
        <!-- 類似 Apple Podcasts 的列表選單 -->
        <ul class="menu-list">
            <li v-for="(item, i) in menuItems" :key="i" class="menu-item" @click="navigateTo(item.route)">
                <div class="left">
                    <component :is="item.icon" class="icon" />
                    <span>{{ item.label }}</span>
                </div>
                <div class="right">
                    <span class="arrow">›</span>
                </div>
            </li>
        </ul>
        <div class="page-container">
            <h3>最新上傳</h3>
        </div>
    </div>
    <footer-menu />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import TopFunctionBar from '../components/TopFunctionBar.vue'
import FooterMenu from '../components/FooterMenu.vue'
import { useRouter } from 'vue-router'
import { UploadIcon, CameraIcon, DollarSignIcon } from 'lucide-vue-next'

const router = useRouter()

const menuItems = [
    { label: '上傳相片', icon: UploadIcon, route: '/upload' },
    { label: '攝影活動', icon: CameraIcon, route: '/my-event-photo' },
    { label: '最近收益', icon: DollarSignIcon, route: '/earnings' }
]

function navigateTo(path) {
    router.push(path)
}
</script>

<style scoped>
.photographer-home {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #fff;
}

.menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #333;
    cursor: pointer;
}

.menu-item .left {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #16a34a;
}

.menu-item .icon {
    width: 18px;
    height: 18px;
}

.menu-item .arrow {
    color: #999;
    font-size: 18px;
}

.page-container h3 {
    text-align: left;
}
</style>
