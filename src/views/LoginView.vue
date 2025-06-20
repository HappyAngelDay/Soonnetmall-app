<template>
    <div class="login-wrapper">
        <div class="avatar">
            <i class="fa fa-user"></i>
        </div>

        <div class="form-group">
            <label>輸入帳號</label>
            <input type="email" placeholder="kelly_shen@soonnet.org" v-model="email"
                :class="{ 'input-error': emailError }" />
        </div>

        <div class="form-group">
            <label>輸入密碼</label>
            <div class="password-wrapper">
                <input :type="showPassword ? 'text' : 'password'" placeholder="請輸入密碼 (6-10 格英文數字或符號)" v-model="password"
                    :class="{ 'input-error': passwordError }" />
                <span class="toggle-eye" @click="togglePassword">
                    <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'" aria-hidden="true"></i>
                </span>
            </div>
            <div v-if="loginError" class="error-msg">帳號或密碼錯誤</div>
        </div>

        <div class="remember">
            <input type="checkbox" id="remember" />
            <label for="remember">記住我</label>
        </div>
        
        <button class="login-btn" @click="handleLogin">GO</button>

        <div class="quick-login">
            <button class="google-btn"><i class="fa fa-google" aria-hidden="true"></i></button>
            <button class="facebook-btn"><i class="fa fa-facebook" aria-hidden="true"></i></button>
        </div>

        <div class="bottom-text">
            還不是會員嗎？ <a href="/register">立即註冊</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import subscriptions from '../data/subscriptions.js'

const router = useRouter()
const showPassword = ref(false)
const email = ref('')
const password = ref('')
const loginError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)

function togglePassword() {
    showPassword.value = !showPassword.value
}

function handleLogin() {
    // 驗證 email 格式
    emailError.value = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    // 密碼格式只檢查非空
    passwordError.value = false

    if (emailError.value) {
        loginError.value = false
        return
    }
    // 檢查 subscriptions
    const found = subscriptions.find(
        u => u.email === email.value && u.password === password.value
    )
    loginError.value = !found
    // 如果密碼錯誤才顯示紅色
    if (!found && !emailError.value) {
        passwordError.value = true
    }
    if (found) {
        router.push('/Home')
    }
}
</script>

<style scoped>
.login-wrapper {
    position: relative;
    top: 10%;
    padding: 16px;
    text-align: center;
    font-size: 14px;
}

.avatar {
    font-size: 64px;
    color: #bbb;
    margin: 20px 0;
}

.form-group {
    text-align: left;
    margin-bottom: 12px;
}

.password-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.password-wrapper i {
    margin-left: 8px;
    color: #888;
    cursor: pointer;
}

.forgot {
    font-size: 12px;
    color: #999;
    float: right;
    margin-top: 4px;
}

.remember {
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 12px 0;
}

.login-btn {
    width: 100%;
    background: #32A45D;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    margin-bottom: 16px;
}

.quick-login {
    margin-bottom: 16px;
}

.quick-login p {
    font-size: 12px;
    color: red;
    margin-bottom: 8px;
}

.google-btn,
.facebook-btn {
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 18px;
    margin: 0 4px;
    padding: inherit
}

.google-btn {
    background: white;
    color: #db4437;
    border: 1px solid #ccc;
}

.facebook-btn {
    background: white;
    color: #4267B2;
    border: 1px solid #ccc;
}

.bottom-text {
    font-size: 12px;
    margin-top: 8px;
}

.bottom-text a {
    color: #32A45D;
    text-decoration: none;
}

.input-error {
    border: 1.5px solid #e00 !important;
    color: #e00 !important;
    background: #fff0f0;
}

.error-msg {
    color: #e00;
    font-size: 12px;
    margin-top: 2px;
    margin-bottom: 2px;
}
</style>
