<template>
    <AppHeader />
    <div class="steps">
        <p>訂單建立</p>
        <p>訂單確認</p>
        <p class="active">超商代碼</p>
        <div class="steps-progress"></div>
        <div class="steps-dot" style="left: 85%"></div>
    </div>
    <div class="cvs-pay-page-content">
        <div class="cvs-pay-mockup">
            <img src="/mockup-cvs.png" alt="超商繳費Mockup" class="mockup-img" @click="showCalendar = true" />
            <div class="mockup-tip">點擊上方圖片預覽繳費流程</div>
        </div>
        <div v-if="showCalendar" class="mockup-modal" @click.self="showCalendar = false">
            <div class="mockup-modal-content">
                <img src="/mockup-cvs-calendar.png" alt="超商繳費日曆" class="mockup-calendar-img" />
                <button class="mockup-close-btn" @click="showCalendar = false">關閉</button>
            </div>
        </div>
        <div class="cvs-pay-content">
            <div class="cvs-pay-desc">
                請至超商機台輸入代碼，產生繳費單後前往櫃台繳費。
            </div>
            <div class="cvs-pay-note">
                <span style="color:#1987e4;cursor:pointer;">注意事項</span><br>
                請於 <span style="color:#e00;">7天內</span> 至超商列印繳費單並完成繳費。
            </div>
        </div>
    </div>
    <FooterMenu />
</template>
<script setup>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'

const showCalendar = ref(false)
</script>
<style scoped>
.cvs-pay-page-content {
    padding: 1.5rem 1rem 1rem 1rem;
    max-width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.cvs-pay-mockup {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 18px;
}
.mockup-img {
    width: 100%;
    max-width: 320px;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.08);
    cursor: pointer;
    border: 1px solid #eee;
}
.mockup-tip {
    font-size: 13px;
    color: #888;
    margin-top: 6px;
}
.mockup-modal {
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.25);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mockup-modal-content {
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 16px 0 rgba(0,0,0,.12);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.mockup-calendar-img {
    width: 320px;
    max-width: 90vw;
    border-radius: 8px;
}
.mockup-close-btn {
    margin-top: 18px;
    background: #32A45D;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px 30px;
    font-size: 16px;
    cursor: pointer;
}
.mockup-close-btn:hover {
    background: #26994b;
}
.cvs-pay-content {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 1.2rem;
    padding: 20px 16px;
    border-radius: 0 0 12px 12px;
    border: 1px solid #e0e0e0;
}
.cvs-pay-desc {
    margin-bottom: 8px;
}
.cvs-pay-note {
    font-size: 13px;
    text-align: left;
    border-radius: 6px;
    color: #1987e4
}
</style>
