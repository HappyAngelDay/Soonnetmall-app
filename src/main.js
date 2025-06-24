import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@vuepic/vue-datepicker'

const app = createApp(App)
app.use(router)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')