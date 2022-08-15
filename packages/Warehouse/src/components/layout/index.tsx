import { defineComponent, Ref, watchEffect } from "vue";
import { ProLayout, openMenu, Header } from "@alien/layout";
import { css } from "@emotion/css";
import { RouterView } from "vue-router";
import { HeaderHeight } from "./config";
import { useSwitch, useLocation } from "@alien/hooks";
import wLogo from "@alien/public/logo/logo-w.png";
import swLogo from "@alien/public/logo/slogo-w.png";
import { AppleOutlined, DingdingOutlined } from "@ant-design/icons-vue";
const LogoScelist = (type: Ref<boolean>) => (type.value ? swLogo : wLogo);
export const BasicLayout = defineComponent({
  setup() {
    const [MenuLocal] = useLocation("MenuLocal");
    const [menuOpen, setOpen] = useSwitch(
      Boolean(MenuLocal.value === "false" ? false : MenuLocal.value)
    );
    watchEffect(() => {
      MenuLocal.value = menuOpen.value;
    });
    const [routerPush] = openMenu();
    return () => (
      <>
        <ProLayout
          loading={false}
          //菜单项
          menus={[
            {
              path: "/manage/base1",
              name: "base1",
              icon: <AppleOutlined></AppleOutlined>,
            },
            {
              path: "/manage/base2",
              name: "base2",
              icon: <DingdingOutlined></DingdingOutlined>,
              children: [
                {
                  path: "/manage/base3",
                  name: "base3",
                  icon: <DingdingOutlined></DingdingOutlined>,
                },
              ],
            },
          ]}
          menuOpen={menuOpen}
          Logo={LogoScelist(menuOpen)}
          v-slots={{
            header: () => (
              <Header
                HeaderHeight={HeaderHeight}
                menuOpen={menuOpen}
                setOpen={setOpen}
              />
            ),
          }}
          onItemClick={(resource) => {
            routerPush(resource);
          }}
          HeaderHeight={HeaderHeight}
        >
          {/* 内容区域 */}
          <div
            class={css({
              height: `calc(100vh - ${HeaderHeight}px)`,
              padding: 20,
            })}
          >
            <div
              class={css({
                height: "100%",
                width: "100%",
                overflowY: "auto",
                background: "#fff",
                padding: 20,
                borderRadius: "2px",
              })}
            >
              <RouterView />
            </div>
          </div>
        </ProLayout>
      </>
    );
  },
});
