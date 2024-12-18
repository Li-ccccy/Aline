import request from "@alien/utils/axios/requiest";

export const Login = (data: {
  username: any;
  password: any;
  captcha: string;
}) => {
  return request({
    method: "post",
    url: "/auth/login",
    data,
    params: {
      noAuth: true,
    },
  });
};

export const LoginOut = () => {
  return request({
    method: "get",
    url: "/auth/test",
  });
};
