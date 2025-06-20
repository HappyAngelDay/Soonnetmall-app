<template>
    <AppHeader />
    <div class="atm-processing-page">
        <div class="atm-processing-content">
            <i class="fa fa-spinner fa-spin" style="font-size:60px;color:#32A45D;margin-bottom:10px;"></i>
            <div class="atm-processing-title">訂單處理中</div>
            <div class="atm-processing-desc">
                您的ATM轉帳訂單已建立，<br>
                處理完成後會寄送通知信件。
            </div>
            <button class="atm-processing-btn" @click="$router.push('/home')">關閉</button>
        </div>
    </div>
    <FooterMenu />
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'
</script>

<style scoped>
.atm-processing-page {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.atm-processing-content {
    border-radius: 18px;
    padding: 2.5rem 2rem 2rem 2rem;
    text-align: center;
    max-width: 320px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.atm-processing-title {
    font-size: 24px;
    font-weight: bold;
    color: #222;
    margin-bottom: 12px;
}
.atm-processing-desc {
    font-size: 16px;
    color: #222;
    margin-bottom: 18px;
    line-height: 1.7;
}
.atm-processing-btn {
    background: #32A45D;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 30px;
    font-size: 16px;
    margin-top: 1rem;
    cursor: pointer;
}
.atm-processing-btn:hover {
    background: #26994b;
}
</style>
