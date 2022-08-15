import { defineComponent, ref, Transition, watch, Ref } from "vue";
import { Layout, Menu, Spin } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { MenuType } from "../types/menu";
import { ProLayoutProps } from "../types/ProLayout";
import { css } from "@emotion/css";
import { map, size, forEach } from "lodash";
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
// 菜单项
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

//  找到菜单需要选择和打开的工具函数
const findTargetResource = (
  resources: any,
  path: any,
  target: any,
  parent: any
) => {
  forEach(resources, (resource) => {
    if (resource.path && path && resource.path === path) {
      target.current = resource;
      target.parent = parent;
      return;
    }
    findTargetResource(resource.children, path, target, [...parent, resource]);
  });
};

const findTargetResourceExtra = (
  resources: any,
  path: any,
  target: any,
  parent: any
) => {
  forEach(resources, (resource) => {
    if (resource.path && path && path.indexOf(resource.path) > -1) {
      target.current = resource;
      target.parent = parent;
      return;
    }
    findTargetResourceExtra(resource.children, path, target, [
      ...parent,
      resource,
    ]);
  });
};

// 整体的结构布局
export const ProLayout = defineComponent((props: ProLayoutProps, context) => {
  const { Sider, Content } = Layout;
  const route = useRoute();
  const openKeysRef: Ref<any> = ref([]);
  const selectedKeysRef: Ref<any> = ref([]);
  watch(
    [route, props.menus],
    () => {
      const target: any = {};
      findTargetResource(props.menus, route.path, target, []);
      if (!target.current) {
        findTargetResourceExtra(props.menus, route.path, target, []);
      }
      if (target.current) {
        selectedKeysRef.value = [target.current.path];
        openKeysRef.value = map(target.parent, (r) => r.path);
      }
    },
    { immediate: true }
  );
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
              height: props.HeaderHeight,
              padding: "16px",
              img: {
                width: props.menuOpen.value ? "40px" : "100%",
              },
              ".fade-leave-active": {
                width: "0",
              },
              ".fade-enter-active": {
                transition: "width 0.3s ease",
              },
              ".fade-enter-from,.fade-leave-to": {
                width: "0",
              },
            })}
          >
            <Stack
              justify={"center"}
              align={"center"}
              style={{ width: "100%" }}
            >
              <Transition name="fade">
                <img src={props.Logo} alt="" key={props.Logo} />
              </Transition>
            </Stack>
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
  HeaderHeight: Number,
};
