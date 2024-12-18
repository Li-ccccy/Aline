import { defineComponent, ref, Transition, watch, provide, inject } from "vue";
import type { Ref, InjectionKey } from "vue";
import { Layout, Menu, Spin } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { MenuType } from "../types/menu";
import { ProLayoutProps, LayoutContType } from "../types/ProLayout";
import { css } from "@emotion/css";
import { map, size, forEach, every } from "lodash";
import { Stack } from "../../components/Stack";
import { useLocation } from "../../hooks";
import { MenuTag } from "../menuTag";
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
      if (
        size(menu?.children) > 0 &&
        every(menu, (e) => (e?.meta?.hidden ? false : true))
      ) {
        return (
          <Menu.SubMenu key={menu.path} title={menu.name} icon={menu.icon}>
            {map(menu.children, (sub) => {
              return sub.meta?.hidden ? null : (
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
      return menu.meta?.hidden ? null : (
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
  const LayoutCont = useLayoutType();
  watch(
    [route, props.menus],
    () => {
      const target: any = {};
      findTargetResource(props.menus?.value, route.path, target, []);
      if (!target.current) {
        findTargetResourceExtra(props.menus?.value, route.path, target, []);
      }
      if (target.current) {
        if (route.meta.selectMenu) {
          selectedKeysRef.value = [route.meta.selectMenu];
        } else {
          selectedKeysRef.value = [target.current.path];
        }
        if (props.menuOpen.value) {
          openKeysRef.value = [];
        } else {
          openKeysRef.value = map(target.parent, (r) => r.path);
        }
      }
    },
    { immediate: true }
  );
  return () => (
    <>
      {LayoutCont.layoutTypeValue.value == LayoutTypeList.horizontal ? (
        <Layout.Header>
          <div
            class={css({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            })}
          >
            <div
              class={css({
                img: {
                  width: "140px",
                },
              })}
            >
              {/* 图片Logo展示区 */}
              <img src={props.Logo} alt="" key={props.Logo} />
            </div>
            <div
              class={css({
                width: "75vw",
              })}
            >
              <Menu
                v-model:openKeys={openKeysRef.value}
                v-model:selectedKeys={selectedKeysRef.value}
                mode={"horizontal"}
                class={css({
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                })}
              >
                {map(props.menus?.value, (menu: MenuType) => {
                  return (
                    <MenuItem
                      key={menu.id || menu.path}
                      menu={menu}
                      onItemClick={props.onItemClick}
                    />
                  );
                })}
              </Menu>
            </div>
            {context.slots.User ? context.slots.User() : null}
          </div>
        </Layout.Header>
      ) : null}

      <Layout class={css({ height: "100vh" })}>
        {LayoutCont.layoutTypeValue.value ==
        LayoutTypeList.horizontal ? null : (
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
                  width: props.menuOpen.value ? "40px" : "80%",
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
              {/* 图片Logo展示区 */}
              <Stack
                justify={"center"}
                align={"center"}
                style={{ width: "100%", height: "100%" }}
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
              class={css({
                height: `calc(100vh - ${props.HeaderHeight}px)`,
                overflowY: "scroll",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              })}
            >
              {map(props.menus?.value, (menu: MenuType) => {
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
        )}

        {/* 主体内容 */}
        <Content>
          {LayoutCont.layoutTypeValue.value == LayoutTypeList.horizontal
            ? null
            : context.slots.header
            ? context.slots.header()
            : null}
          {props.openMenuTag ? <MenuTag></MenuTag> : null}
          {context.slots.default ? context.slots.default() : null}
        </Content>
      </Layout>
    </>
  );
});

// 布局风格
const provideSymblKey = Symbol() as InjectionKey<LayoutContType>;
export const LayoutTypeList = {
  horizontal: "horizontal", // 头部菜单布局
  inline: "inline", // 左侧菜单布局
};

export const useLayoutType = () => {
  return inject(provideSymblKey) as LayoutContType;
};

export const LayoutTypeNav = defineComponent({
  setup(_, ctx) {
    // 布局类型的切换
    const [layoutType, setLayoutType] = useLocation("LayoutType");
    provide(provideSymblKey, {
      layoutTypeValue: layoutType,
      setLayoutType: setLayoutType,
    });
    return () => {
      return <>{ctx.slots.default && ctx.slots.default()}</>;
    };
  },
});

ProLayout.props = {
  loading: Boolean,
  menus: Array,
  onItemClick: Function,
  menuOpen: Boolean,
  Logo: String,
  HeaderHeight: Number,
  openMenuTag: {
    type: Boolean,
    default: false,
  },
};

// 布局默认导出内容
export const BaseProLayout = defineComponent((props: ProLayoutProps, ctx) => {
  return () => (
    <LayoutTypeNav>
      <ProLayout {...props} v-slots={{ ...ctx.slots }}></ProLayout>
    </LayoutTypeNav>
  );
});

BaseProLayout.props = {
  ...ProLayout.props,
};
