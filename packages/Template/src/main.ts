import { createApp } from "vue";
import { App } from "./App";
import createLogo from "@alien/utils/createIcon";
import router from "@/router/index";
import ILogo from "@alien/public/logo/alien.logo.svg";
import "ant-design-vue/dist/antd.variable.min.css";
import "@alien/theme/defult.less";
import "virtual:svg-icons-register";
import "./RouteGuard";
const app = createApp(App);
app.use(router);
app.mount("#app");
app.config.warnHandler = () => null;

// 创建网页标题中的图标
createLogo(ILogo);
