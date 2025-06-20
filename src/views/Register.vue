<template>
    <AppHeader />
    <div class="register-wrapper">
        <h3 class="welcome">歡迎成為SOONNETMALL會員</h3>

        <div class="form-group">
            <label>用戶名</label>
            <input type="text" placeholder="尋寶網大粉絲" />
        </div>

        <div class="form-group">
            <label>性別</label>
            <select>
                <option value="">請選擇</option>
                <option>男</option>
                <option>女</option>
            </select>
        </div>

        <div class="form-group">
            <label>電話</label>
            <input type="tel" placeholder="0912345678" />
        </div>

        <div class="form-group">
            <label>輸入帳號</label>
            <input type="email" placeholder="kelly_shen@soonnet.org" v-model="email"
                :class="{ 'input-error': emailError }" @blur="validateEmail" />
            <div v-if="emailError" class="error-msg">帳號輸入錯誤</div>
        </div>

        <div class="form-group">
            <label>輸入密碼</label>
            <div class="password-wrapper">
                <input :type="showPassword ? 'text' : 'password'" placeholder="請輸入密碼 (6-10 格英文數字或符號)" v-model="password"
                    :class="{ 'input-error': passwordError }" @blur="validatePassword" />
                <span class="toggle-eye" @click="togglePassword">
                    <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
                </span>
            </div>
            <div v-if="passwordError" class="error-msg">密碼輸入錯誤</div>
        </div>

        <button class="submit-btn">註冊</button>
    </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import { ref } from 'vue'

const showPassword = ref(false)
const email = ref('')
const password = ref('')
const emailError = ref(false)
const passwordError = ref(false)

function togglePassword() {
    showPassword.value = !showPassword.value
}

function validateEmail() {
    // 簡單 email 格式驗證
    emailError.value = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
}

function validatePassword() {
    // 6-10位，必須是英文或數字
    passwordError.value = !/^[A-Za-z0-9]{6,10}$/.test(password.value)
}
</script>

<style scoped>
.submit-btn {
    width: 100%;
    background: #32A45D;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    margin-top: 12px;
}
</style>
