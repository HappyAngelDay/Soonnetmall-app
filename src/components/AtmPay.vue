<template>
    <div class="atm-pay-header">
        <span class="atm-pay-title">
            ATM轉帳繳費
        </span>
    </div>
    <div class="atm-pay-content">
        <div class="atm-bank-select">
            <label for="bank">選擇銀行</label>
            <select id="bank" v-model="bank">
                <option value="">選擇銀行</option>
                <option>台灣土地銀行</option>
                <option>板信商業銀行</option>
                <option>台灣銀行</option>
                <option>國泰世華銀行</option>
                <option>中國信託</option>
                <option>其他金融機構</option>
            </select>
        </div>
        <div class="atm-note">
            <div class="atm-note-title">注意事項</div>
            <div class="atm-note-content">
                金融卡發卡銀行與ATM所屬銀行不同時，銀行可能收取
                <span style="color:#e00;">跨行轉帳手續費</span>，實際收取金額依各銀行公告為主。<br>
                請務必確認繳費金額與繳費期限後再進行繳款。
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const bank = ref('')
</script>
<style scoped>
.atm-pay-box {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .08);
    padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    max-width: 350px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.atm-pay-header {
    font-size: 18px;
    font-weight: bold;
    color: #32A45D;
    text-align: center;
    background: #f3f3f3;
    border-radius: 12px 12px 0 0;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.atm-pay-title {
    font-size: 18px;
    font-weight: bold;
    color: #222;
    display: flex;
    align-items: center;
}

.atm-pay-content {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 20px 16px;
    border-radius: 0 0 12px 12px;
    border: 1px solid #e0e0e0;
}

.atm-bank-select {
    margin-bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.atm-bank-select label {
    font-size: 15px;
    color: #222;
    margin-bottom: 2px;
}

.atm-bank-select select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 15px;
    color: #222;
    background: #fff;
}

.atm-note {
    text-align: left;
    border-radius: 6px;
    color: #1987e4;
    font-size: 14px;
    background: #f7f7f7;
    padding: 10px 12px;
}

.atm-note-title {
    color: #1987e4;
    font-weight: bold;
    margin-bottom: 4px;
}
</style>
