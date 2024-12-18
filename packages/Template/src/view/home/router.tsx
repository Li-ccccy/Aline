import Home from "./home";
import Inter from "./index";
import { AimOutlined } from "@ant-design/icons-vue";
import { SvgIcon } from "@alien/components";
import { List } from "./list";

import type { RouterItem } from "@/types/routerItem";

const Router: RouterItem = {
  path: "/manage/home",
  name: "违规处罚",
  redirect: "/manage/home/index",
  icon: <SvgIcon name="alien" size={18}></SvgIcon>,
  children: [
    {
      path: "/manage/home/index",
      name: "人员违规记录",
      component: Home,
      icon: <SvgIcon name="alien" size={18}></SvgIcon>,
    },
    {
      path: "/manage/home/list",
      name: "人员违规记录-新增",
      component: List,
      icon: <SvgIcon name="alien" size={18}></SvgIcon>,
      meta: {
        hidden: true,
        selectMenu: "/manage/home/index",
      },
    },
    {
      path: "/manage/home/inter",
      name: "ProTable",
      component: <Inter></Inter>,
      icon: <AimOutlined></AimOutlined>,
    },
  ],
};

export default Router;
