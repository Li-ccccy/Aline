import { BasicLayout } from "@/components/layout/index";
import { createRouter, createWebHistory } from "vue-router";
import { Base } from "../views/base/index";
const accessRoute = [
  {
    path: "/manage",
    component: BasicLayout,
    children: [
      {
        path: "base",
        component: Base,
      },
    ],
  },
];
export default createRouter({
  history: createWebHistory(),
  routes: accessRoute,
});
