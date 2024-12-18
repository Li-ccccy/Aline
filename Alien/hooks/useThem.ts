import { readonly, ref, watch, reactive } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { forIn } from "lodash";
const defaultThem = {
  name: "defult",
  antdBase: {
    primaryColor: "#6b67ec",
    errorColor: "#ff4d4f",
    warningColor: "#faad14",
    successColor: "#52c41a",
    infoColor: "#1890ff",
  },
  custom: {
    "--Dprimary-color": "#272381", // 菜单颜色
    "--Dant-primary-color": "#6b67ec", // 全局主色
    "--Dantd-wave-shadow-color": "#6b67ec",
    "--Hover-link": "#1890ff",
  },
};

export type otherThemType = Array<{
  name: string;
  antdBase: any;
  custom?: any;
}>;

export const userThem = (otherThem?: otherThemType) => {
  const themList = otherThem ? [defaultThem, ...otherThem] : [defaultThem];
  const Them = ref(0);
  const setThem = (i: number) => {
    Them.value = i;
  };
  watch(
    Them,
    () => {
      ConfigProvider.config({
        theme: themList[Them.value].antdBase,
      });
      themList[Them.value].custom && setRootStyle(themList[Them.value].custom);
    },
    { immediate: true }
  );
  return [themList, setThem];
};

function setRootStyle(colorObject: any): void {
  const Dom = document.documentElement;
  forIn(colorObject, (value, key) => {
    Dom.style.setProperty(key, value);
  });
}
