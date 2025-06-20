import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import VueDatePicker from '@vuepic/vue-datepicker'

// 引入 Framework7
import Framework7 from 'framework7/lite-bundle'
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle'

import 'framework7/css'
import '@vuepic/vue-datepicker/dist/main.css'

// 啟用 Framework7 Vue
Framework7.use(Framework7Vue)
createApp(App).use(router).component('VueDatePicker', VueDatePicker).mount('#app')
