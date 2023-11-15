import { createRouter, createWebHistory } from "vue-router";

import WelcomeView from "@/views/welcome/WelcomeView.vue";

const routes = [
  { path: "/", redirect: { name: "identify" } },
  { path: "/welcome", name: "identify", component: WelcomeView },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
