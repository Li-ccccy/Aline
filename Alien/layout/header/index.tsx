import { Layout } from "ant-design-vue";
import { defineComponent, Ref } from "vue";
import { css } from "@emotion/css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
type Headertype = {
  HeaderHeight: number;
  menuOpen: Ref<boolean>;
  setOpen: () => void;
};
export const Header = defineComponent((props: Headertype, ctx) => {
  return () => {
    return (
      <Layout.Header
        class={css({
          position: "relative",
          zIndex: 1,
          backgroundColor: "white",
          padding: "0 22px",
          width: "100%",
          height: props.HeaderHeight,
          display: "flex",
          alignItems: "center",
          boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.1)",
          "& > * + *": { marginLeft: 8 },
        })}
      >
        {/* 切换菜单是否展开 */}
        {props.menuOpen.value ? (
          <MenuUnfoldOutlined
            class="trigger"
            onClick={() => {
              props.setOpen();
            }}
          ></MenuUnfoldOutlined>
        ) : (
          <MenuFoldOutlined
            class="trigger"
            onClick={() => {
              props.setOpen();
            }}
          ></MenuFoldOutlined>
        )}
        <div>{ctx.slots.default ? ctx.slots.default() : null}</div>
        <div
          class={css({
            flexGrow: 1,
            display: "flex",
            flexDirection: "row-reverse",
          })}
        >
          {ctx.slots.User ? ctx.slots.User() : null}
          {/* <UserInfo /> */}
        </div>
      </Layout.Header>
    );
  };
});
Header.props = ["HeaderHeight", "menuOpen", "setOpen"];
