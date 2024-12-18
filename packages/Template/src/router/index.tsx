import { BasicLayout } from "@/components/layout/index";
import { createRouter, createWebHistory } from "vue-router";
import { Redict } from "./Redict";
import Login from "@/view/login/router";
import NotFind from "@/view/404";
import Home from "@/view/home/router";
import System from "@/view/System/router";

// 动态路由
export const accessRoute = {
  path: "/manage",
  component: BasicLayout,
  // children: Routers()
  children: [Home, System],
};

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "admin",
      redirect: "/login",
    },
    Login,
    accessRoute as unknown as any,
    {
      path: "/redict/:fullpath*",
      component: BasicLayout,
      children: [
        {
          path: "",
          component: Redict,
        },
      ],
      meta: {
        hiddenTopTag: true,
      },
    },
    {
      path: "/*",
      name: "404",
      component: NotFind,
    },
  ],
});
