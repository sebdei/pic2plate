import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'material-icons/iconfont/material-icons.css'

import '@/assets/css/fonts/material-icons.css'

const i18n = createI18n({
  legacy: false
})

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
