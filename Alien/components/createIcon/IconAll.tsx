import { defineComponent, ref, createVNode, VNode } from "vue";
import { Modal, message } from "ant-design-vue";
import * as $Icon from "@ant-design/icons-vue";
import { css } from "@emotion/css";
import AllIcon from "./icon.json";
import { map } from "lodash";
import { Stack } from "../Stack";
export default defineComponent({
  emits: ["handleSelect"],
  async setup(_, ctx) {
    const SelectActive = ref();
    const isOpen = ref(false);
    const handleOk = () => {
      isOpen.value = false;
    };
    const handleSelect = (IconName: string) => {
      SelectActive.value = IconName;
      ctx.emit("handleSelect", IconName);
    };
    const hide = message.loading("正在加载图标库", 0);
    const awaitLoad = () => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          isOpen.value = true;
          hide();
          resolve();
        }, 500);
      });
    };
    await awaitLoad();
    ctx.expose({
      isOpen,
    });
    return () => {
      return (
        <Modal
          title="选择图标"
          v-model:visible={isOpen.value}
          onOk={handleOk}
          destroyOnClose={true}
        >
          <div
            class={css({
              height: "40vh",
              overflowY: "scroll",
              border: "1px solid #c0c0c0",
              borderRadius: 8,
            })}
          >
            <Stack
              align={"cneter"}
              justify={"flex-start"}
              wrap={"wrap"}
              class={css({
                fontSize: 24,
                textAlign: "center",
                ">div": {
                  padding: 8,
                  ">span": {
                    display: "inline-block",
                    padding: "0 6px",
                    border: "1px solid #333",
                  },
                },
              })}
            >
              {map(AllIcon, (Item) => {
                // @ts-ignore
                let VNode = $Icon[Item];
                return (
                  <div
                    class={css({
                      width: "20%",
                    })}
                  >
                    <span
                      class={css({
                        backgroundColor:
                          SelectActive.value == Item
                            ? "var(--ant-primary-color) !important"
                            : "transparent",
                        borderColor:
                          SelectActive.value == Item
                            ? "var(--ant-primary-color) !important"
                            : "#333 !important",
                      })}
                      onClick={() => handleSelect(Item)}
                    >
                      <VNode></VNode>
                    </span>
                  </div>
                );
              })}
            </Stack>
          </div>
        </Modal>
      );
    };
  },
});
