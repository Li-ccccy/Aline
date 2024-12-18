import UseMsg from "@/user";
import {
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  Drawer,
  Tooltip,
  Divider,
  InputPassword,
  message,
  notification,
} from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import {
  SettingOutlined,
  ExportOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import {
  defineComponent,
  reactive,
  ref,
  toRefs,
  shallowRef,
  createVNode,
  watch,
} from "vue";
import { css } from "@emotion/css";
import { updatePassward } from "@/api/index";
import { useRequest } from "vue-request";
import { clearToken } from "@alien/utils/auth";
import { useRouter } from "vue-router";
import userInfo from "@/user";
import { Stack } from "@alien/components";
import { ThemeProvide } from "@/components/theme";
import { SvgIcon } from "@alien/components";
// 右上角user组件。
export const User = defineComponent({
  setup() {
    const visible = ref<boolean>(false);
    const FromEle = shallowRef<any>(null);
    const LayoutSetting = shallowRef<any>(null);
    const IsFirst = ref<boolean>(false);
    const settingLauout = () => {
      LayoutSetting.value.onChange();
    };
    const Router = useRouter();
    // const { run, loading } = useRequest(updatePassward, {
    //   manual: true,
    //   onSuccess: async ({ data }) => {
    //     if (data.code == 200) {
    //       message.success(data.message);
    //       visible.value = false;
    //       let info = await getUser();
    //       userInfo.baseInfo = info.data.result.sysUserResult;
    //       userInfo.roleIds = info.data.result.roleIds;
    //     }
    //   },
    // });
    // const upPassward = async () => {
    //   let { type, data } = await FromEle.value.onSubmit();
    //   type &&
    //     run({
    //       ...toRefs<{
    //         newPassword: any;
    //         oldPassword: any;
    //         verifyPassword: any;
    //       }>(data),
    //     });
    // };
    const OutLogin = () => {
      Modal.confirm({
        title: "提示",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确认退出登录？",
        onOk() {
          clearToken();
          userInfo.baseInfo = null;
          message.success("退出成功！");
          Router.replace("/login");
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {},
      });
    };
    const onCancel = () => {
      if (IsFirst.value) {
        message.warning("请先修改初始密码！");
        visible.value = true;
      }
    };
    watch(
      () => userInfo.baseInfo,
      (val) => {
        if (val && !val.pwdUpdateDate) {
          visible.value = true;
          IsFirst.value = true;
          notification.warning({
            duration: null,
            message: "提示",
            description: "首次登录系统的用户必须修改初始化密码！",
          });
        } else {
          IsFirst.value = false;
        }
      },
      {
        immediate: true,
      }
    );
    return () => {
      return (
        <>
          {/* 下拉菜单 */}
          <Dropdown
            v-slots={{
              overlay: () => {
                return (
                  <Menu>
                    <Menu.Item
                      icon={<SettingOutlined></SettingOutlined>}
                      key={"settingAntd"}
                      onClick={(e) => {
                        e.stopPropagation();
                        settingLauout();
                      }}
                    >
                      系统设置
                    </Menu.Item>
                    <Menu.Item
                      icon={<SettingOutlined></SettingOutlined>}
                      key={"password"}
                      onClick={(e) => {
                        e.stopPropagation();
                        visible.value = true;
                      }}
                    >
                      修改密码
                    </Menu.Item>
                    <Menu.Item
                      key={"exit"}
                      icon={<ExportOutlined></ExportOutlined>}
                      onClick={(e) => {
                        e.stopPropagation();
                        OutLogin();
                      }}
                    >
                      退出登录
                    </Menu.Item>
                  </Menu>
                );
              },
            }}
          >
            <Avatar
              src={
                (UseMsg.baseInfo && UseMsg.baseInfo.avatar) ||
                UseMsg.defaultAvator
              }
              size={"large"}
            ></Avatar>
          </Dropdown>
          {/* 修改密码 */}
          <Modal
            v-model:visible={visible.value}
            title={`${IsFirst.value ? "修改初始密码" : "修改密码"}`}
            okText="确定"
            cancelText="取消"
            // confirmLoading={loading.value}
            // onOk={upPassward}
            destroyOnClose={true}
            onCancel={onCancel}
          >
            <SettingPassword ref={FromEle}></SettingPassword>
          </Modal>
          {/* 系统设置 */}
          <Settings ref={LayoutSetting}></Settings>
        </>
      );
    };
  },
});

// 修改密码组件。
interface FormState {
  oldPassword: string;
  newPassword: string;
  verifyPassword: string;
}

export const SettingPassword = defineComponent({
  setup(_, context) {
    // 校验密码相同
    let checkVerifyPassword = async (_rule: Rule, value: any) => {
      if (!value || value !== formState.newPassword) {
        return Promise.reject("请确保两次密码输入相同");
      } else {
        return Promise.resolve();
      }
    };
    // 校验密码长度
    let checkNewPassword = async (_rule: Rule, value: any) => {
      if (!value || value?.length < 6) {
        return Promise.reject("请输入6位新密码");
      } else if (value == formState.oldPassword) {
        return Promise.reject("新旧密码不能相同");
      } else {
        return Promise.resolve();
      }
    };
    const formState = reactive<FormState>({
      oldPassword: "",
      newPassword: "",
      verifyPassword: "",
    });
    const rulesRef = {
      oldPassword: [{ required: true, message: "请输入旧密码" }],
      newPassword: [
        {
          required: true,
          validator: checkNewPassword,
        },
      ],
      verifyPassword: [
        {
          required: true,
          validator: checkVerifyPassword,
        },
      ],
    };
    const useForm = Form.useForm;
    const { validate, validateInfos } = useForm(formState, rulesRef);
    const onSubmit = () => {
      return new Promise<{ type: boolean; data?: any }>((resolve, reject) => {
        validate()
          .then(() => {
            resolve({
              type: true,
              data: formState,
            });
          })
          .catch((err) => {
            console.log("error", err);
            resolve({ type: false });
          });
      });
    };
    context.expose({ onSubmit });
    return () => (
      <Form
        label-col={{ span: 6 }}
        wrapper-col={{ span: 16 }}
        model={formState}
      >
        <Form.Item
          label="旧密码"
          name="oldPassword"
          {...validateInfos.oldPassword}
        >
          <Input v-model:value={formState.oldPassword}></Input>
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          {...validateInfos.newPassword}
        >
          <InputPassword v-model:value={formState.newPassword}></InputPassword>
        </Form.Item>

        {formState.newPassword.length ? (
          <Form.Item label="密码强度">
            <div
              class={css({
                backgroundColor: "#eee",
                borderRadius: 10,
                height: 20,
                position: "relative",
              })}
            >
              {formState.newPassword.length >= 1 &&
              formState.newPassword.length < 8 ? (
                <div
                  class={css({
                    width: "33%",
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "red",
                    position: "absolute",
                    left: 0,
                  })}
                ></div>
              ) : formState.newPassword.length >= 8 &&
                formState.newPassword.length < 10 ? (
                <div
                  class={css({
                    width: "66%",
                    backgroundColor: "yellow",
                    borderRadius: 10,
                    height: 20,
                    position: "absolute",
                    left: 0,
                  })}
                ></div>
              ) : (
                <div
                  class={css({
                    width: "100%",
                    backgroundColor: "green",
                    borderRadius: 10,
                    height: 20,
                    position: "absolute",
                    left: 0,
                  })}
                ></div>
              )}
            </div>
            <div class={css({ textAlign: "center" })}>
              {formState.newPassword.length >= 1 &&
              formState.newPassword.length < 8 ? (
                <span>弱</span>
              ) : formState.newPassword.length >= 8 &&
                formState.newPassword.length < 10 ? (
                <span>中</span>
              ) : (
                <span>强</span>
              )}
            </div>
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item
          label="确认新密码"
          name="verifyPassword"
          {...validateInfos.verifyPassword}
        >
          <InputPassword
            v-model:value={formState.verifyPassword}
          ></InputPassword>
        </Form.Item>
      </Form>
    );
  },
});
// 修改系统设置的功能。
export const Settings = defineComponent({
  setup(_, context) {
    const visible = ref(false);
    const onChange = () => {
      visible.value = !visible.value;
    };
    context.expose({ onChange });
    return () => (
      <Drawer
        width={300}
        title={"系统设置"}
        placement={"right"}
        visible={visible.value}
        onClose={onChange}
      >
        {/* // LayoutCont.setLayoutType(LayoutTypeList.horizontal); */}
        {/* 两个布局选择 */}
        <SettingLayOut></SettingLayOut>
        {/* <Divider></Divider> */}
        <SettingThem></SettingThem>
      </Drawer>
    );
  },
});
// 修改菜单布局
export const SettingLayOut = defineComponent({
  setup() {
    const Them = ThemeProvide();
    return () => {
      return (
        <div
          class={css({
            img: {
              cursor: "pointer",
              marginRight: 20,
            },
          })}
        >
          <div
            class={css({
              fontSize: 18,
              marginBottom: 16,
            })}
          >
            菜单布局设置
          </div>
          <Stack justify={"flex-start"} spacing={20}>
            <Tooltip
              placement="top"
              v-slots={{
                title: <span>侧边导航</span>,
              }}
            >
              <div
                onClick={() => {
                  Them?.setheaderMenu(false);
                }}
                class={css({
                  position: "relative",
                  ">span": {
                    position: "absolute",
                    right: 22,
                    bottom: 4,
                  },
                })}
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg"
                  alt=""
                />
                {!Them?.headerMenu.value ? (
                  <span>
                    <SvgIcon name="select"></SvgIcon>
                  </span>
                ) : null}
              </div>
            </Tooltip>
            <Tooltip
              placement="top"
              v-slots={{
                title: <span>顶部与侧边导航</span>,
              }}
            >
              <div
                onClick={() => {
                  Them?.setheaderMenu(true);
                }}
                class={css({
                  position: "relative",
                  ">span": {
                    position: "absolute",
                    right: 22,
                    bottom: 4,
                  },
                })}
              >
                {Them?.headerMenu.value ? (
                  <span>
                    <SvgIcon name="select"></SvgIcon>
                  </span>
                ) : null}

                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg"
                  alt=""
                />
              </div>
            </Tooltip>
          </Stack>
        </div>
      );
    };
  },
});

// 修改主题颜色
export const SettingThem = defineComponent({
  setup() {
    const Theme = ThemeProvide();
    return () => (
      <>
        <div
          class={css({
            marginTop: 30,
            fontSize: 18,
            marginBottom: 16,
          })}
        >
          主题设置
        </div>
        <div
          class={css({
            display: "flex",
            alignItem: "center",
            justifyContent: "flex-start",
            ">div": {
              width: 20,
              height: 20,
              borderRadius: 6,
              cursor: "pointer",
              marginRight: 20,
            },
          })}
        >
          {Theme &&
            Theme.themList.map((e, i) => {
              return (
                <div
                  onClick={() => {
                    Theme && Theme.setTheme(i);
                  }}
                  class={css({ backgroundColor: e.antdBase.primaryColor })}
                ></div>
              );
            })}
        </div>
      </>
    );
  },
});
