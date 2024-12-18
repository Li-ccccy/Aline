import { defineComponent, onMounted } from "vue";
import { css } from "@emotion/css";
import { accessRoute } from "@/router/index";
import { userAuth } from "@/App";
import { useRoute, useRouter } from "vue-router";
import { TagObj } from "@alien/layout/menuTag/TagList";
export const HeaderMenu = defineComponent((props, ctx) => {
  const Router = useRouter();
  // 动态菜单
  // 根据url地址默认选择子菜单
  const AsstRouter = userAuth();
  const route = useRoute();
  // 初始化的选中路由

  let InitRoute = accessRoute.children.find((target) => {
    return route.path.indexOf(target.path) != -1;
  });
  AsstRouter
    ? InitRoute?.children
      ? (AsstRouter.menuList.value = InitRoute?.children)
      : (AsstRouter.menuList.value = [])
    : null;
  //Router.push(`/redict${route.path}`)

  // 点击头部导航菜单
  const handleHeaderClick = (item: any) => {
    if (route.path.indexOf(item.path) == -1) {
      TagObj.TagList.value = [];
      Router.push(item.path);
      AsstRouter ? (AsstRouter.menuList.value = item.children) : null;
    }
  };
  return () => {
    return (
      <div
        class={css({
          marginLeft: 20,
          Maxwidth: `calc(100vw - 340px)`,
        })}
      >
        <div
          class={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "auto",
            ">div": {
              cursor: "pointer",
              margin: "0 10px",
              textAlign: "center",
              position: "relative",
            },
            ".active": {
              "::after": {
                position: "absolute",
                bottom: 4,
                left: 0,
                content: '""',
                width: "100%",
                height: 4,
                backgroundColor: "var(--ant-primary-color)",
                borderRadius: 2,
              },
            },
          })}
        >
          {accessRoute.children.map((item: any) => {
            return (
              <>
                {item.meta?.hidden ? null : (
                  <div
                    onClick={() => handleHeaderClick(item)}
                    class={route.path.indexOf(item.path) != -1 ? "active" : ""}
                  >
                    {item.icon ? (
                      <span
                        class={css({
                          marginRight: 8,
                        })}
                      >
                        <item.icon></item.icon>
                      </span>
                    ) : null}
                    {item.name}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  };
});
