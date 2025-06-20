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
import vuetify from './plugins/vuetify'

// 啟用 Framework7 Vue
Framework7.use(Framework7Vue)
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
