import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import VueDatePicker from '@vuepic/vue-datepicker'

// 匯入 Vuetify 所需資源
import 'vuetify/styles'                 // Vuetify 核心 CSS
import { createVuetify } from 'vuetify' // Vuetify 核心插件
import * as components from 'vuetify/components'   // 所有元件
import * as directives from 'vuetify/directives'   // 所有指令

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')

