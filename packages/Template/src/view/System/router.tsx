import { Role } from "./role";
export default {
  path: "/manage/system",
  name: "系统设置",
  redirect: "/manage/system/role",
  children: [
    {
      path: "/manage/system/role",
      redirect: "/manage/system/role/1",
      name: "角色设置",
      children: [
        {
          path: "/manage/system/role/1",
          name: "角色设置123",
          component: <Role></Role>,
        },
      ],
    },
  ],
};
