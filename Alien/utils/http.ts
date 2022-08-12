import axios from "axios";
import { useLocation } from "@alien/hooks";
import { watch, onMounted } from "vue";

const Auth = "auth";
// 登录相关的内容
export const [auth, setAuth] = useLocation(Auth);
watch(auth, () => {
  console.log(9999);
});

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export const test = () => {
  onMounted(() => {
    console.log("@----");
    console.log(auth.value);
  });
};
