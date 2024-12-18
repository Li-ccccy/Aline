import { defineComponent, provide, inject } from "vue";
import type { InjectionKey, Ref } from "vue";
import { RouterView } from "vue-router";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "dayjs/locale/zh-cn";
import Them from "./components/theme";
import { useTitle } from "@alien/hooks";
import { useMenuList } from "@/router/assest";

const provideSymblKey = Symbol() as InjectionKey<{
  menuList: Ref<any>;
}>;

export const userAuth = () => {
  return inject(provideSymblKey);
};

export const App = defineComponent({
  setup() {
    useTitle("大宗物料管理系统");
    const { menuList } = useMenuList();
    provide(provideSymblKey, { menuList });
    return () => {
      return (
        <ConfigProvider locale={zhCN}>
          <Them>
            <RouterView></RouterView>
          </Them>
        </ConfigProvider>
      );
    };
  },
});
