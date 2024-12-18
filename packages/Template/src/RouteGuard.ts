import { reactive } from "vue";
import router from "@/router/index";
import { getToken } from "@alien/utils/auth";
import { userInfo } from "@/user";
const WhiteList = ["/login"];

router.beforeEach((to, from, next) => {
  next();
  return;
  // 白名单直接走
  if (WhiteList.findIndex((val) => val == to.path) != -1) {
    next();
  } else {
    // 需要校验
    Auth(to, next);
  }
  //白名单直接走
  next();
  if (WhiteList.findIndex((val) => val == to.path) != -1) {
    next();
  } else {
    // 需要校验
    Auth(to, next);
  }
});
const Auth = async (to: any, next: any) => {
  let token = getToken();
  if (token) {
    next();
    // if (userInfo.baseInfo) {
    //   next();
    // } else {
    //   // 没有用户信息调接口
    //   let info = await getUser();
    //   userInfo.baseInfo = info.data.result.sysUserResult;
    //   userInfo.roleIds = info.data.result.roleIds;
    //   setTimeout(() => {
    //     next({ ...to, replace: true });
    //   });
    // }
  } else {
    next("/login");
  }
};
