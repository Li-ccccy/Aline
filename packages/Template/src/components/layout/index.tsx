import {
  defineComponent,
  Ref,
  watchEffect,
  computed,
  watch,
  KeepAlive,
} from "vue";
import Transition from "@alien/components/Transition/index.vue";
import { BaseProLayout, openMenu, Header } from "@alien/layout";
import { css, cx } from "@emotion/css";
import { RouterView, useRoute } from "vue-router";
import { HeaderHeight } from "./config";
import { useSwitch, useLocation } from "@alien/hooks";
import wLogo from "@alien/public/logo/logo-w.png";
import swLogo from "@alien/public/logo/slogo-w.png";
import { User } from "../user";
import { userAuth } from "@/App";
import { HeaderMenu } from "../HeaderMenu";
import { ThemeProvide } from "@/components/theme";
import { accessRoute } from "@/router/index";
import { TagObj } from "@alien/layout/menuTag/TagList";
const LogoScelist = (type: Ref<boolean>) => (type.value ? swLogo : wLogo);

export const BasicLayout = defineComponent({
  setup() {
    const [MenuLocal, setMenuLocal] = useLocation("MenuLocal");
    const [menuOpen, setOpen] = useSwitch(
      Boolean(MenuLocal.value === "false" ? false : MenuLocal.value)
    );
    watchEffect(() => {
      setMenuLocal(menuOpen.value);
    });
    const [routerPush] = openMenu();
    const route = useRoute();
    const Theme = ThemeProvide();
    // 动态菜单
    const AsstRouter = userAuth();
    watch(
      () => Theme?.headerMenu.value,
      (value) => {
        if (!value) {
          AsstRouter && (AsstRouter.menuList.value = [...accessRoute.children]);
          console.log(AsstRouter);
        }
      },
      {
        immediate: true,
      }
    );

    const keepList = computed(() => {
      return TagObj.TagList.value.map((e) => {
        return e.name;
      });
    });
    return () => (
      <>
        <BaseProLayout
          loading={AsstRouter?.menuList.value.length == 0}
          //菜单项
          menus={AsstRouter?.menuList}
          // menus={MangeMunuList}
          menuOpen={menuOpen}
          Logo={LogoScelist(menuOpen)}
          v-slots={{
            header: () => (
              <Header
                HeaderHeight={HeaderHeight}
                menuOpen={menuOpen}
                setOpen={setOpen}
                v-slots={{
                  User: <User></User>,
                }}
              >
                {Theme?.headerMenu.value ? <HeaderMenu></HeaderMenu> : null}
              </Header>
            ),
          }}
          onItemClick={(resource) => {
            routerPush(resource);
          }}
          HeaderHeight={HeaderHeight}
          openMenuTag={true}
        >
          {/* 内容区域 */}
          <div
            class={css({
              height: `calc(100vh - ${HeaderHeight}px - 32px)`,
              overflowY: "scroll",
            })}
          >
            <div
              class={cx(
                css({
                  borderRadius: "8px",
                  margin: 20,
                  boxSizing: "border-box",
                  height: `calc(100vh - ${HeaderHeight}px - 75px)`,
                  overflowY: "scroll",
                }),
                "boxNav P20"
              )}
            >
              <Transition>
                <RouterView
                  v-slots={{
                    default: (Alots: any) => {
                      return (
                        <KeepAlive include={keepList.value}>
                          <Alots.Component key={route.path}></Alots.Component>
                        </KeepAlive>
                      );
                    },
                  }}
                ></RouterView>
              </Transition>
            </div>
          </div>
        </BaseProLayout>
      </>
    );
  },
});
