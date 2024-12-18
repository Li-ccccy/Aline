import { VNode, Ref } from "vue";

export interface MenuType {
  id?: number;
  path: string;
  name: string;
  children?: Array<MenuType>;
  icon?: VNode;
}
