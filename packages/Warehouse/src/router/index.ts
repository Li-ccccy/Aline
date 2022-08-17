import { BasicLayout } from "@/components/layout/index";
import { createRouter, createWebHistory } from "vue-router";
import MangeMunuList from "./manageMenu";
const accessRoute = [
  {
    path: "/manage",
    component: BasicLayout,
    redirect: "/manage/docs",
    children: [...MangeMunuList],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/manage/docs",
    },
    ...accessRoute,
  ],
});
