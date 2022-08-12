import { createApp } from "vue";
import App from "./App.vue";
import createLogo from "@alien/utils/createIcon";
import router from "@/router/index";
import "ant-design-vue/dist/antd.css";
import ILogo from "@alien/public/logo/alien.logo.svg";
createApp(App).use(router).mount("#app");

// 创建网页标题中的图标
createLogo(ILogo);
