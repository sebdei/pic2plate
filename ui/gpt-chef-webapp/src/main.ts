import router from "@/router";
import { createApp } from "vue";

import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.css";
import "material-icons/iconfont/material-icons.css";

import "@/assets/css/fonts/material-icons.css";

const app = createApp(App);
app.use(router);

app.mount("#app");
