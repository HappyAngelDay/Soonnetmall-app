<template>
    <nav class="footer-menu">
        <div v-for="item in menu" :key="item.name" :class="['menu-item', { active: item.name === active }]"
            @click="navigate(item)">
            <img
                v-if="item.iconImg"
                :src="item.iconImg"
                class="menu-icon"
                :class="{ 'active-icon': item.name === active }"
            />
            <i v-else :class="item.icon"></i>
            <span>{{ item.label }}</span>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menu = [
    { name: 'capture', label: '拍手專區', iconImg: '/img/app-icon-01.svg' },
    { name: 'events', label: '近期賽事', iconImg: '/img/app-icon-02.svg' },
    { name: 'home', label: '首頁', iconImg: '/img/app-icon-03.svg', route: '/Home' },
    { name: 'cart', label: '購物車', iconImg: '/img/app-icon-04.svg', route: '/Cart' },
    { name: 'member', label: '會員專區', iconImg: '/img/app-icon-05.svg' },
    // 如需 fallback icon class，可加 icon: 'fa fa-xxx'
]

const active = ref('home')

function navigate(item) {
    active.value = item.name
    if (item.route) {
        router.push(item.route)
    }
    // 其他 menu 可根據需要加 route
}
</script>

<style scoped>
.footer-menu {
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #ccc;
    background: #fff;
    height: 60px;
}

.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #888;
    font-size: 12px;
}

.menu-item i {
    font-size: 20px;
    margin-bottom: 4px;
    color: #888;
    transition: color 0.2s;
}

.menu-item.active i {
    color: #32A45D;
}

.menu-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    display: block;
    filter: grayscale(1) brightness(0.7);
    transition: filter 0.2s;
}

.menu-icon.active-icon {
    /* 單色SVG變#32A45D */
    filter: brightness(0) saturate(100%) invert(51%) sepia(34%) saturate(1017%) hue-rotate(74deg) brightness(92%) contrast(92%);
}

.menu-item.active {
    color: #32A45D;
}
</style>
