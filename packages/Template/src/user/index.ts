import { reactive } from "vue";
import defaultAvator from "./defaultAvatar.png";
export const userInfo = reactive<{
  baseInfo: any;
  defaultAvator: any;
  roleIds: Array<any>;
}>({
  baseInfo: null,
  defaultAvator,
  roleIds: [],
});

export default userInfo;
