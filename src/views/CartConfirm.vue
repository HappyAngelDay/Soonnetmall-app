<template>
    <AppHeader />
    <div class="steps">
        <p>訂單建立</p>
        <p class="active">訂單確認</p>
        <p>確認支付</p>
        <div class="steps-progress"></div>
        <div class="steps-dot" style="left: 50%"></div>
    </div>
    <div class="pay-content">
        <div class="form-group">
            <label>購買信箱</label>
            <input type="email" v-model="buyerEmail" :placeholder="autoEmail" disabled class="auto-email" />
        </div>
        <div class="form-group">
            <label>通知信箱</label>
            <input type="email" v-model="notifyEmail" />
        </div>
        <div class="pay-methods">
            <div v-for="(item, idx) in payList" :key="item.value"
                :class="['pay-row', { active: pay === item.value, disabled: item.disabled }]"
                @click="!item.disabled && (pay = item.value)" :tabindex="item.disabled ? -1 : 0"
                :aria-disabled="item.disabled ? 'true' : 'false'">
                <span>{{ item.label }}</span>
                <input type="radio" :checked="pay === item.value" :disabled="item.disabled" @change="pay = item.value"
                    tabindex="-1" />
            </div>
        </div>
        <div class="photo-count">
            相片共計: {{ photoCount }}張
        </div>
        <button
            class="pay-now"
            :disabled="!buyerEmail || !notifyEmail || photoCount <= 0"
            @click="goToPay"
        >
            確認支付
        </button>
    </div>
    <FooterMenu />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'
import { useRouter } from 'vue-router'

const autoEmail = 'kelly_shen@soonnet.org'
const buyerEmail = ref(autoEmail)
const notifyEmail = ref(autoEmail)
const photoCount = ref(2)

const pay = ref('credit')
const payList = [
    { value: 'credit', label: '信用卡繳費' },
    { value: 'cvs', label: '便利商店代碼繳費' },
    { value: 'atm', label: 'ATM轉帳繳費' },
    { value: 'linepay', label: 'LINE Pay(暫無開放)', disabled: true },
    { value: 'stripe', label: 'Stripe(暫無開放)', disabled: true }
]

const cardNo = ref('')
const cardValid = ref('')
const cardCvc = ref('')
const rememberCard = ref(true)

const router = useRouter()
function goToPay() {
    // 用 name 路由跳轉，避免路徑大小寫或 chunk loading 問題
    router.push({ name: 'CartPay', query: { pay: pay.value } })
}

onMounted(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems') || '[]')
    photoCount.value = cart.length
})
</script>

<style scoped>
.cart-confirm-view {
    padding: 0 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.auto-email {
    background: #f5f5f5;
    color: #bbb;
}

.auto-tip {
    color: #e00;
    font-size: 13px;
    margin-left: 2px;
}

.photo-count {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0px;
}

.pay-methods {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    margin-top: 10px;
}

.pay-row {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    color: #222;
    cursor: pointer;
    transition: background 0.2s;
    background: #fff;
    justify-content: space-between;
}

.pay-row:last-child {
    border-bottom: none;
}

.pay-row input[type="radio"] {
    accent-color: #32A45D;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    appearance: none;
    outline: none;
    position: relative;
}

.pay-row input[type="radio"]:checked::after {
    position: absolute;
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.pay-row i {
    margin-left: auto;
    font-size: 18px;
    color: #888;
}

.pay-row.active {
    color: #32A45D;
    font-weight: bold;
    background: #f7faf7;
}

.pay-row.disabled {
    color: #bbb;
    background: #f8f8f8;
    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
}

.pay-row.disabled input[type="radio"] {
    pointer-events: none;
}

.ecpay-pay-list {
    margin-top: 20px;
    padding: 0;
    list-style: none;
}

.ecpay-pl-act {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 10px;
}

.ecpay-pl-intro {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
}

.ecpay-pl-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #32A45D;
    position: relative;
    margin-right: 10px;
}

.ecpay-pl-radio::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #32A45D;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s;
}

.pay-row.active .ecpay-pl-radio::after {
    transform: translate(-50%, -50%) scale(1);
}

.ecpay-pl-type {
    font-size: 16px;
    color: #222;
    flex-grow: 1;
}

.ecpay-pl-icon-type {
    display: flex;
    gap: 8px;
}

.ecpay-visa,
.ecpay-master,
.ecpay-jcb {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: contain;
    background-repeat: no-repeat;
}

.ecpay-visa {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%2332A45D" d="M0 0h24v24H0z"/%3E%3Cpath fill="%23fff" d="M16.24 12l-1.47-3.56L12 12l2.77 3.56L16.24 12zm-4.24 0l-1.47-3.56L8 12l2.77 3.56L12 12zm4.24 0l-1.47-3.56L16 12l-2.77 3.56L16.24 12z"/%3E%3C/svg%3E');
}

.ecpay-master {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%2332A45D" d="M0 0h24v24H0z"/%3E%3Cpath fill="%23fff" d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/%3E%3C/svg%3E');
}

.ecpay-jcb {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%2332A45D" d="M0 0h24v24H0z"/%3E%3Cpath fill="%23fff" d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/%3E%3C/svg%3E');
}

.ecpay-card-info-tab {
    padding: 16px;
}

.ecpay-select-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.ecpay-cit-item {
    margin-bottom: 16px;
}

.ecpay-icon-ic_credit,
.ecpay-icon-ic_daterange,
.ecpay-icon-ic_lock {
    width: 24px;
    height: 24px;
    fill: #32A45D;
}

.ecpay-cc-card,
.ecpay-date,
.ecpay-cc-cvc {
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 16px;
    color: #222;
    width: 100%;
}

.ecpay-card-status-line {
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.ecpay-red {
    color: #e00;
    font-size: 14px;
}

.ecpay-card-detail {
    flex-grow: 1;
    height: 2px;
    background: #32A45D;
}

.ecpay-pay-check {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.ecpay-checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid #32A45D;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
}

.ecpay-checkbox.eck-2 {
    background: #32A45D;
}

.epc-txt {
    font-size: 14px;
    color: #222;
    flex-grow: 1;
}
</style>
