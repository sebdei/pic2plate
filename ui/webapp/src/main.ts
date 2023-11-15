import { createApp } from "vue";
import router from "@/router";
import { createI18n } from "vue-i18n";

import App from "./App.vue";

import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.css";

import "@/assets/css/fonts/material-icons.css";

const i18n = createI18n({
  // something vue-i18n options here ...
});

const app = createApp(App);
app.use(router);
app.use(i18n);

app.mount("#app");
