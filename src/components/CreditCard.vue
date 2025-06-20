<template>
    <div class="pay-header">
        <div class="pay-card-title">信用卡付款<br>
            <span>(一次付清)</span>
        </div>
        <span class="pay-card-icons">
            <span class="pay-visa"></span>
            <span class="pay-master"></span>
            <span class="pay-jcb"></span>
        </span>
    </div>
    <div class="pay-card-form">
        <div class="pay-card-field">
            <label>
                <i class="fa fa-credit-card"></i>
                信用卡號
            </label>
            <input class="pay-card-input" maxlength="19" placeholder="0000 0000 0000 0000" type="tel"
                v-model="cardNo" />
        </div>
        <div class="pay-card-field">
            <label>
                <i class="fa fa-calendar"></i>
                有效期限
            </label>
            <input class="pay-card-input" maxlength="7" placeholder="MM / YY" type="tel" v-model="cardValid" />
        </div>
        <div class="pay-card-field">
            <label>
                <i class="fa fa-lock"></i>
                安全碼
            </label>
            <input class="pay-card-input" maxlength="3" pattern="^\d{3}$" placeholder="000" type="tel"
                v-model="cardCvc" />
        </div>
        <div class="pay-card-remember">
            <input type="checkbox" id="rememberCard" v-model="rememberCard" />
            <label for="rememberCard">我要記住本次交易資訊，方便下次快速結帳。</label>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const cardNo = ref('')
const cardValid = ref('')
const cardCvc = ref('')
const rememberCard = ref(true)
</script>
<style scoped>

.pay-card-icons {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 6px;
    height: 32px;
}

.pay-visa,
.pay-master,
.pay-jcb {
    display: inline-block;
    width: 32px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    vertical-align: middle;
}

.pay-visa {
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png');
}

.pay-master {
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png');
}

.pay-jcb {
    background-image: url('https://ecpg.ecpay.com.tw/Content/images/img_jcb.svg');
}

.pay-card-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 20px 16px;
    border-radius: 0 0 12px 12px;
    border: 1px solid #e0e0e0;
}

.pay-card-field label {
    font-size: 15px;
    color: #222;
    font-weight: 500;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.pay-card-input {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 10px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    color: #222;
    background: #f7f7f7;
    margin-top: 4px;
}

.pay-card-remember {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    color: #222;
}

.pay-card-remember input[type="checkbox"] {
    margin-right: 8px;
    accent-color: #32A45D;
}

.pay-card-btn {
    margin-top: 1.5rem;
    background: #32A45D;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 12px 0;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}
</style>
