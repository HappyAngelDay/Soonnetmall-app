<template>
    <AppHeader />
    <div class="pay-success-page">
        <div class="pay-success-content">
            <i class="fa fa-check" style="font-size:60px;color:#222;margin-bottom:10px;"></i>
            <div class="pay-success-title">付款成功</div>
            <div class="pay-success-desc">
                感謝您的購買！<br>
                您可以到信箱下載購買照片，<br>
                或是到
                <router-link to="/home" class="pay-success-link">我的相片</router-link>
                中下載
            </div>
            <button class="pay-success-btn" @click="$router.push('/home')">關閉</button>
        </div>
    </div>
    <FooterMenu />
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'
</script>

<style scoped>
.pay-success-page {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pay-success-content {
    border-radius: 18px;
    padding: 2.5rem 2rem 2rem 2rem;
    text-align: center;
    max-width: 320px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.pay-success-title {
    font-size: 24px;
    font-weight: bold;
    color: #222;
    margin-bottom: 12px;
}

.pay-success-desc {
    font-size: 16px;
    color: #222;
    margin-bottom: 18px;
    line-height: 1.7;
}

.pay-success-link {
    color: #32A45D;
    text-decoration: underline;
    cursor: pointer;
}

.pay-success-btn {
    background: #32A45D;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 30px;
    font-size: 16px;
    margin-top: 1rem;
    cursor: pointer;
}

.pay-success-btn:hover {
    background: #26994b;
}
</style>
