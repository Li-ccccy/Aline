import { createApp } from "vue";
import App from "./App.vue";
import createLogo from "@alien/utils/createIcon";
import router from "@/router/index";
import "ant-design-vue/dist/antd.less";
import "@alien/theme/defult.less";
import ILogo from "@alien/public/logo/alien.logo.svg";

const app = createApp(App);
app.use(router);
app.mount("#app");
app.config.warnHandler = () => null;

// 创建网页标题中的图标
createLogo(ILogo);
