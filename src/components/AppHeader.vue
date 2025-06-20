<template>
  <div class="app-header">
    <div class="register-logo">
      <img width="150"
        src="https://www.soonnetmall.com/img/LOGO%E6%A8%99%E6%BA%96%E8%A6%8F%E7%AF%84_LOGO%EF%BC%8B%E4%B8%AD%E8%8B%B1%E6%96%87%E5%AD%97-%E7%99%BD_3x1.DVnl3YHw.png"
        alt="LOGO" @click="handleLogoClick" style="cursor:pointer" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 假設登入狀態用 localStorage 儲存 login=true
function handleLogoClick() {
  if (localStorage.getItem('login') === 'true') {
    router.push('/Home')
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.app-header {
  background-color: #0000005c;
  box-shadow: 0 2px 5px #0000001a;
  padding-top: 30px;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  z-index: 99;
  width: 100%;
}

.register-logo img {
  margin-top: 10px;
  height: 30px;
  width: auto;
}
</style>
