import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Framework7 主檔案（完整版）
import Framework7 from 'framework7'

// Vue plugin
import Framework7Vue, { registerComponents } from '../node_modules/framework7-vue/framework7-vue-bundle'

// 啟用 Framework7 Vue
Framework7.use(Framework7Vue)

const app = createApp(App)
app.use(router)


app.mount('#app')
