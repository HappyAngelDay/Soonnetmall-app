<template>
    <AppHeader />
    <div class="steps">
        <p>訂單建立</p>
        <p>訂單確認</p>
        <p class="active">確認支付</p>
        <div class="steps-progress"></div>
        <div class="steps-dot" style="left: 85%"></div>
    </div>
    <div class="pay-content">
        <component :is="payComponent" />
        <button class="pay-now" @click="handlePay">確認支付</button>
    </div>
    <FooterMenu />
</template>

<script setup>
import { computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import FooterMenu from '../components/FooterMenu.vue'
import CreditCard from '../components/CreditCard.vue'
import CvsPay from '../components/CvsPay.vue'
import AtmPay from '../components/AtmPay.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const payType = computed(() => route.query.pay || 'credit')

const payComponent = computed(() => {
    if (payType.value === 'cvs') return CvsPay
    if (payType.value === 'atm') return AtmPay
    return CreditCard
})

function handlePay() {
    if (payType.value === 'atm') {
        router.push('/atm-processing')
    } else {
        router.push('/pay-success')
    }
}
</script>

<style scoped>
.pay-card-btn {
    background: #26994b;
    margin-top: 20px;
}

.pay-card-btn:hover {
    background: #1f7a3d;
}   
</style>
