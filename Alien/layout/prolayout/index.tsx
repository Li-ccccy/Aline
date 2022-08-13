import { defineComponent, ref, Ref } from "vue";
import { Layout, Menu, Spin } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { MenuType } from "../types/menu";
import { css } from "@emotion/css";
import { map, size } from "lodash";
import { Stack } from "../../components/Stack";
// 点击菜单，跳转路由
export const openMenu = () => {
  const router = useRouter();
  return [
    (menu: MenuType) => {
      router.push(menu.path);
    },
  ];
};

const MenuItem = defineComponent({
  props: {
    menu: {
      type: Object,
      default: null,
    },
    onItemClick: {
      type: Function,
    },
  },
  setup(props) {
    return () => {
      const menu = props.menu;
      if (size(menu?.children) > 0) {
        return (
          <Menu.SubMenu key={menu.path} title={menu.name} icon={menu.icon}>
            {map(menu.children, (sub) => {
              return (
                <MenuItem
                  key={sub.id || sub.path}
                  menu={sub}
                  onItemClick={props.onItemClick}
                />
              );
            })}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item
          key={menu.path}
          icon={menu.icon}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.onItemClick && props.onItemClick(menu);
          }}
        >
          <a>{menu.name}</a>
        </Menu.Item>
      );
    };
  },
});

type Props = {
  loading?: boolean;
  menus?: Array<MenuType>;
  onItemClick?: (_: MenuType) => void;
  menuOpen: Ref<boolean>;
  Logo: string;
};

export const ProLayout = defineComponent((props: Props, context) => {
  const { Sider, Content } = Layout;
  const openKeysRef = ref(["/manage/base2"]);
  const selectedKeysRef = ref(["/manage/base3"]);
  return () => (
    <>
      <Layout class={css({ height: "100vh" })}>
        <Sider
          v-model:collapsed={props.menuOpen.value}
          trigger={null}
          collapsible
        >
          <div
            class={css({
              width: "100%",
              padding: "16px",
              ">img": {
                height: "100%",
                width: props.menuOpen.value ? "40px" : "100%",
              },
            })}
          >
            <img src={props.Logo} alt="" />
          </div>
          {/* 获取资源树菜单 */}
          {props.loading && (
            <Stack justify={"center"} style={{ paddingTop: 50 }}>
              <Spin spinning />
            </Stack>
          )}
          {/* 菜单的形成 */}
          <Menu
            v-model:openKeys={openKeysRef.value}
            v-model:selectedKeys={selectedKeysRef.value}
            mode={"inline"}
          >
            {map(props.menus, (menu: MenuType) => {
              return (
                <MenuItem
                  key={menu.id || menu.path}
                  menu={menu}
                  onItemClick={props.onItemClick}
                />
              );
            })}
          </Menu>
          {/* 插槽内容 */}
          {context.slots.siderExtra && context.slots.siderExtra()}
        </Sider>
        {/* 主体内容 */}
        <Content>
          {context.slots.header ? context.slots.header() : null}
          {context.slots.default ? context.slots.default() : null}
        </Content>
      </Layout>
    </>
  );
});
ProLayout.props = {
  loading: Boolean,
  menus: Array,
  onItemClick: Function,
  menuOpen: Boolean,
  Logo: String,
};
