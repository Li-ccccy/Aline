import { defineComponent, reactive, ref } from "vue";
import { css } from "@emotion/css";
import LoginBg from "./img/Loginbg.png";
import Logo from "./img/logo.png";
import { Stack } from "@alien/components";
import { Form, Input, InputPassword, Button } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Bottom } from "@/components/Bottom";
import { useValidate } from "@alien/utils";
import { Login as ToLogin, GetCode, LoginOut } from "@/api/index";
import { useRequest } from "vue-request";
import { useRouter } from "vue-router";
import userInfo from "@/user";
import { HomePath } from "@/config/index";
export const Login = defineComponent({
  setup() {
    const Router = useRouter();
    // 如果有个人信息的话直接去首页
    if (userInfo.baseInfo) {
      Router.push(HomePath);
    }
    const { run: runOut } = useRequest(LoginOut, {
      manual: true,
    });
    return () => (
      <>
        <div
          class={css({
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${LoginBg})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          })}
        >
          {/* 登录表单 */}
          <div
            class={css({
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            })}
          >
            <Stack
              justify={"center"}
              align={"center"}
              class={css({
                marginBottom: 84,
                ">img": {
                  width: 104,
                  height: 55,
                  marginRight: 17,
                },
                ">div": {
                  fontSize: 38,
                  color: "#fff",
                },
              })}
            >
              <img src={Logo} alt="" onClick={runOut} />
              <div>大宗3.0</div>
            </Stack>
            <Stack justify={"center"} align={"center"}>
              <div
                class={css({
                  width: 556,
                  background: "#FFFFFF",
                  borderRadius: 17,
                  boxSizing: "border-box",
                  padding: 72,
                  display: "flex",
                })}
              >
                <Stack
                  justify={"center"}
                  align={"center"}
                  inline
                  class={css({
                    width: "100%",
                  })}
                >
                  <LoginForm></LoginForm>
                </Stack>
              </div>
            </Stack>
          </div>
          {/* 底部 */}
          <Bottom></Bottom>
        </div>
      </>
    );
  },
});

const LoginForm = defineComponent({
  setup() {
    const Router = useRouter();
    const formState = reactive({
      userName: "",
      passworld: "",
      captcha: "",
    });
    const rulesRef = {
      userName: [{ required: true, message: "请输入用户名" }],
      passworld: [{ required: true, message: "请输入密码" }],
    };
    const useForm = Form.useForm;
    const KeyDown = (e: KeyboardEvent) => {
      if (e.code == "Enter") {
        Submit();
      }
    };
    const { validate, validateInfos } = useForm(formState, rulesRef);
    // 登陆
    // const { run, loading, data } = useRequest(ToLogin, {
    //   manual: true,
    //   onSuccess: ({ data }) => {
    //     if (data.status == 200) {
    //       // 设置token
    //       message.success("登录成功");
    //       setToken(data.data.accessToken);
    //       setRefreshToken(data.data.refreshToken);
    //       Router.push(HomePath);
    //     }
    //   },
    // });
    const loading = ref(false);
    const Submit = async () => {
      // 表单规则校验
      let info = await useValidate({ formState, validate });
      info.type ? Router.push(HomePath) : null;
    };

    return () => (
      <Form
        class={css({
          width: "100%",
          "input,span": {
            fontSize: 18,
          },
        })}
      >
        <Form.Item name={"userName"} {...validateInfos.userName}>
          <Input
            placeholder={"用户名"}
            v-model:value={formState.userName}
            onKeydown={KeyDown}
            class={css({
              borderRadius: 8,
              height: 60,
            })}
          >
            {{
              prefix: () => <UserOutlined></UserOutlined>,
            }}
          </Input>
        </Form.Item>
        <Form.Item name={"passworld"} {...validateInfos.passworld}>
          <InputPassword
            v-model:value={formState.passworld}
            placeholder={"密码"}
            onKeydown={KeyDown}
            class={css({
              borderRadius: 8,
              height: 60,
            })}
          >
            {{
              prefix: () => <LockOutlined></LockOutlined>,
            }}
          </InputPassword>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading.value}
            onClick={Submit}
            type="primary"
            class={css({
              width: "100%",
              height: 64,
              borderRadius: 8,
            })}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  },
});
