import { createRouter, createWebHistory } from "vue-router";

import WelcomeView from "@/views/welcome/WelcomeView.vue";
import RecipeView from "@/views/recipe/RecipeView.vue";

const routes = [
  { path: "/", redirect: { name: "identify" } },
  { path: "/welcome", name: "identify", component: WelcomeView },
  { path: "/recipe", name: "recipe", component: RecipeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
