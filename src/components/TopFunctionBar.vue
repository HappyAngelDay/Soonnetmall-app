<template>
    <div class="page-title">
    </div>
    <div class="top-bar">
        <a style="text-align: left; color: white;">
            <i class="fa fa-angle-left" style="padding-left: 10px;" aria-hidden="true"></i>
        </a>
        <p style="margin: 0;" class="title">{{ pageTitle }}</p>

    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => {
    // 根據路由名稱顯示不同標題
    switch (route.name) {
        case 'Upload':
            return '上傳相片'
        case 'Home':
            return '首頁'
        case 'Register':
            return '註冊'
        case 'Login':
            return '登入'
        case 'CartView':
            return '購物車'
        case 'CartConfirm':
            return '訂單確認'
        case 'CartPay':
            return '付款'
        case 'PaySuccess':
            return '付款成功'
        case 'EventPhoto':
            return '活動相片'
        case 'MyEventPhoto':
            return '攝影活動'
        case 'PhotographerHome':
            return '攝手專區'
        default:
            return ''
    }
})
</script>