import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:windi.css'
import 'swiper/css'

const app = createApp(App)

Object.values(import.meta.globEager('/src/modules/*.ts')).forEach((module) => module.install?.(app))

app.mount('#app')
