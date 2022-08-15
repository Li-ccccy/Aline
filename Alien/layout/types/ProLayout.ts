import { MenuType } from "../types/menu";
import { Ref } from "vue";
export type ProLayoutProps = {
  loading?: boolean;
  menus?: Array<MenuType>;
  onItemClick?: (_: MenuType) => void;
  menuOpen: Ref<boolean>;
  Logo: string;
  HeaderHeight?: number;
};
