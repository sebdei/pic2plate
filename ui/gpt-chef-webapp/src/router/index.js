import { createRouter, createWebHistory } from 'vue-router'

import IdentifyImage from '@/views/identify/IdentifyImage.vue'

const routes = [
  { path: '/', redirect: { name: 'identify' } },
  { path: '/identify', name: 'identify', component: IdentifyImage }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})


export default router
