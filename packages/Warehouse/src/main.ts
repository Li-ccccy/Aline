import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import createLogo from "@alien/utils/createIcon";
createApp(App).mount("#app");

// 创建网页标题中的图标
createLogo();
