import { createRouter, createWebHistory } from "vue-router";

import ErrorView from "@/views/error/ErrorView.vue";
import RecipeView from "@/views/recipe/RecipeView.vue";
import WelcomeView from "@/views/welcome/WelcomeView.vue";
import StepsView from "@/views/steps/StepsView.vue";

const routes = [
  { path: "/", redirect: { name: "WelcomeView" } },
  { path: "/error", name: "ErrorView", component: ErrorView },
  { path: "/recipe", name: "RecipeView", component: RecipeView },
  { path: "/welcome", name: "WelcomeView", component: WelcomeView },
  { path: "/step", name: "StepsView", component: StepsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
