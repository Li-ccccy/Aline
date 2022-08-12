import { VNode } from "vue";

export interface MenuType {
  id?: number;
  path: string;
  name: string;
  children?: Array<any>;
  icon: VNode;
  onItemClick: Function;
}
