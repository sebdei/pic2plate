import ErrorView from '@/views/error/ErrorView.vue'
import RecipeView from '@/views/recipe/RecipeView.vue'
import StepList from '@/views/recipe/steps/StepList.vue'
import WelcomeView from '@/views/welcome/WelcomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: { name: 'WelcomeView' } },

  { path: '/error', name: 'ErrorView', component: ErrorView },
  { path: '/recipe', name: 'RecipeView', component: RecipeView },
  { path: '/steps', name: 'StepView', component: StepList },
  { path: '/welcome', name: 'WelcomeView', component: WelcomeView },

  { path: '/:catchAll(.*)', redirect: { name: 'WelcomeView' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
