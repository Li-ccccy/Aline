import { MenuType } from "../types/menu";
import type { Ref } from "vue";
import type { initial } from "../../hooks/useLocation";
export type ProLayoutProps = {
  loading?: boolean;
  menus?: Ref<Array<MenuType>>;
  onItemClick?: (_: MenuType) => void;
  menuOpen: Ref<boolean>;
  Logo: string;
  HeaderHeight?: number;
  openMenuTag?: Boolean;
};

export type LayoutContType = {
  layoutTypeValue: Ref<any>;
  setLayoutType: (I: initial) => void;
};
