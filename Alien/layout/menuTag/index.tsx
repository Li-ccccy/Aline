import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { css } from "@emotion/css";
import { Tag } from "ant-design-vue";
import { TagObj, tagClose, TagRfush } from "./TagList";
import { Menu } from "./menu";
const ActiveClass = {
  color: "#fff !important",
  backgroundColor: "var(--ant-primary-color)",
  "::before": {
    content: '""',
    background: "#fff",
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    position: "relative",
    marginRight: 4,
  },
  span: {
    color: "#fff !important",
    marginLeft: "6px",
  },
};

const customDirective: any = {
  mounted: (el: HTMLDivElement, binding: any) => {
    el.oncontextmenu = function (e) {
      binding.value.MenuObject.Show = true;
      binding.value.MenuObject.left = e.clientX;
      binding.value.MenuObject.top = e.clientY;
      binding.value.MenuObject.EventList = binding.value.EventList;
      binding.value.MenuObject.path = binding.value.path;
      document.addEventListener("click", () => {
        binding.value.MenuObject.Show = false;
        binding.value.MenuObject.left = 0;
        binding.value.MenuObject.top = 0;
      });
      return false;
    };
  },
};

export const MenuTag = defineComponent({
  directives: { custom: customDirective },
  setup() {
    // 路由相关
    const Route = useRoute();
    const Router = useRouter();
    // 滚动相关
    const Scorll = ref<HTMLDivElement>();
    onMounted(() => {
      let falg = false;
      let scrollLeft: any;
      let donWx: any;
      Scorll.value &&
        Scorll.value.addEventListener("mousedown", (evevt) => {
          evevt.preventDefault();
          // 当前卷去的高度。
          falg = true;
          donWx = evevt.clientX;
          scrollLeft = Scorll.value?.scrollLeft;
          Scorll.value &&
            Scorll.value.addEventListener("mousemove", (evevt) => {
              if (falg) {
                let moveX = evevt.clientX;
                let scrollX = moveX - donWx;

                if (Scorll.value) {
                  Scorll.value.scrollLeft = scrollLeft - scrollX;
                }
              }
            });
          Scorll.value &&
            Scorll.value.addEventListener("mouseup", (evevt) => {
              falg = false;
            });
          Scorll.value &&
            Scorll.value.addEventListener("mouseleave", (evevt) => {
              falg = false;
            });
        });
    });
    //点击路由跳转
    const handleRouter = (item: any) => {
      if (item.path === Route.path) return;
      Router.push(item.path);
    };
    // 对于是否展示右键菜单。
    const MenuObject = reactive({
      Show: false,
      top: 0,
      left: 0,
      EventList: [],
      path: "",
    });

    return () => {
      return (
        <>
          <MuenEvet MenuObject={MenuObject}></MuenEvet>
          <div
            class={css({
              width: "100%",
              background: "#fff",
              position: "relative",
              zIndex: 9,
              borderTop: "1px solid #efefef",
              padding: "2px 20px",
            })}
          >
            <div
              ref={Scorll}
              class={css({
                width: "auto",
                overflowX: "scroll",
                whiteSpace: "nowrap",
                // display: "flex",
                // justifyContent: "flex-start",
                // flexWrap: "nowrap",
                i: {
                  fontStyle: "normal",
                  ">span": {
                    display: "inline-block",
                    cursor: "pointer",
                    color: "#767676",
                    padding: "2px 6px",

                    ">span": {
                      transition: "all .3s",
                      borderRadius: "50%",
                      padding: "3px",
                      width: 16,
                      height: 16,
                      textAlign: "center",
                      display: "inline-block",
                    },
                    ">span:hover": {
                      backgroundColor: "#b4bccc",
                      color: "#fff",
                    },
                  },
                },
              })}
            >
              {TagObj.TagList.value.map((item, i) => {
                return (
                  <i
                    onClick={() => {
                      handleRouter(item);
                    }}
                  >
                    <Tag
                      key={item.path}
                      v-custom={{
                        MenuObject,
                        EventList: item.EventBus,
                        path: item.path,
                      }}
                      class={css(
                        Route.path == item.path ? (ActiveClass as any) : {}
                      )}
                      closable
                      onClose={() => {
                        tagClose(item, Route.path, Router);
                      }}
                    >
                      {item.name}
                    </Tag>
                  </i>
                );
              })}
            </div>
          </div>
          <Menu position={MenuObject}></Menu>
        </>
      );
    };
  },
});

export const MuenEvet = defineComponent({
  props: ["MenuObject"],
  setup(props) {
    const Route = useRoute();
    const Router = useRouter();
    // 事件的构造函数
    const MentEvent = (item: any) => {
      return [
        {
          title: "刷新",
          event: () => {
            // 刷新当前路由
            TagRfush(props.MenuObject.path, Router);
          },
        },
        {
          title: "关闭其他",
          event: () => {
            let Target = TagObj.TagList.value.find((target) => {
              return target.path == props.MenuObject.path;
            });
            Target ? (TagObj.TagList.value = [Target]) : null;
            Router.push(props.MenuObject.path);
          },
        },
      ];
    };
    watch(
      Route,
      (route) => {
        if (route.meta && !route.meta.hiddenTopTag) {
          // 如果tag对象里面有，不添加
          TagObj.TagList.value.findIndex((item) => item.path == route.path) < 0
            ? TagObj.TagList.value.push({
                name: route.name as string,
                path: route.path,
                EventBus: MentEvent(props.MenuObject.path),
              })
            : null;
        }
      },
      { immediate: true }
    );
    return () => {
      return null;
    };
  },
});
