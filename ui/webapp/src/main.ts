import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'

import 'bootstrap/dist/css/bootstrap.css'

import '@/assets/css/fonts/material-icons.css'
import '@/assets/css/fonts/poppins.css'

const i18n = createI18n({
  legacy: false,
  locale: 'de'
})

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')

registerSW({ immediate: true })
