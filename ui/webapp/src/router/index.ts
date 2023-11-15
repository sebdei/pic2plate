import { createRouter, createWebHistory } from "vue-router";

import ErrorView from "@/views/error/ErrorView.vue";
import RecipeView from "@/views/recipe/RecipeView.vue";
import WelcomeView from "@/views/welcome/WelcomeView.vue";

const routes = [
  { path: "/", redirect: { name: "welcome" } },
  { path: "/error", name: "ErrorView", component: ErrorView },
  { path: "/recipe", name: "RecipeView", component: RecipeView },
  { path: "/welcome", name: "WelcomeView", component: WelcomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
