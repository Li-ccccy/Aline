// 动态路由
import { ref } from "vue";

export const useMenuList = () => {
  const menuList = ref<Array<any>>([]);
  return {
    menuList,
  };
};
