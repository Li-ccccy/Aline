import { BasicLayout } from "@/components/layout/index";
import { createRouter, createWebHistory } from "vue-router";
import { Base, Base2, Base3 } from "../views/base/index";
const accessRoute = [
  {
    path: "/",
    redirect: "/manage",
  },
  {
    path: "/manage",
    component: BasicLayout,
    children: [
      {
        path: "base1",
        component: Base,
      },
      {
        path: "base2",
        component: Base2,
      },
      {
        path: "base3",
        component: Base3,
      },
    ],
  },
];
export default createRouter({
  history: createWebHistory(),
  routes: accessRoute,
});
