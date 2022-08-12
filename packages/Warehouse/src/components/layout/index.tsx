import { defineComponent, Ref } from "vue";
import { ProLayout, openMenu, Header } from "@alien/layout";
import { css } from "@emotion/css";
import { RouterView } from "vue-router";
import { HeaderHeight } from "./config";
import { useSwitch } from "@alien/hooks";
import wLogo from "@alien/public/logo/logo-w.png";
import swLogo from "@alien/public/logo/slogo-w.png";
const LogoScelist = (type: Ref<boolean>) => (type.value ? swLogo : wLogo);
export const BasicLayout = defineComponent({
  setup() {
    const [menuOpen, setOpen] = useSwitch();
    console.log(menuOpen);
    return () => (
      <>
        <ProLayout
          loading={true}
          menus={[]}
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
          onItemClick={(resource: any) => {
            console.log("@@@resource", resource);
            openMenu(resource);
          }}
        >
          <div
            class={css({
              height: `calc(100vh - ${HeaderHeight}px)`,
              overflowY: "auto",
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
