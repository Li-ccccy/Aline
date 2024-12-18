import type { RouteRecordRaw } from "vue-router";
declare type RouterItem =
  | RouteRecordRaw
  | {
      icon?: any;
      meta?: {
        hidden?: boolean; // 是否在左侧菜单隐藏
        selectMenu?: string; // 指定选中的菜单
        hiddenTopTag?: boolean; // 是否在topTag中显示。
      };
      children?: Array<RouterItem>;
    };
