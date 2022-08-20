import { defineComponent, ref } from "vue";
import { css } from "@emotion/css";

export default defineComponent({
  setup(_, { slots }) {
    const open = ref(false);
    return () => (
      <>
        <h2
          class={css({
            marginTop: 60,
          })}
        >
          代码演示
        </h2>
        <div
          class={css({
            width: "100%",
            border: "1px solid  #f0f0f0",
          })}
        >
          <div
            class={css({
              borderBottom: "1px solid  #f0f0f0",
              padding: 20,
            })}
          >
            {slots.default ? slots.default() : null}
          </div>
          <div
            class={css({
              padding: 10,
              ".codeBtn": {
                textAlign: "center",
                img: {
                  opacity: ".55",
                  width: "20px",
                  cursor: "pointer",
                  transition: "all .4s",
                },
                "img:hover": {
                  opacity: "1",
                },
              },
            })}
          >
            <div class="codeBtn">
              <img
                onClick={() => {
                  open.value = !open.value;
                }}
                v-show={open.value}
                src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg"
                alt=""
              />
              <img
                onClick={() => {
                  open.value = !open.value;
                }}
                v-show={!open.value}
                src="https://gw.alipayobjects.com/zos/antfincdn/Z5c7kzvi30/expand.svg"
                alt=""
              />
            </div>
            {slots.code ? <div v-show={open.value}>{slots.code()}</div> : null}
          </div>
        </div>
        <h2
          class={css({
            marginTop: 10,
          })}
        >
          API
          <div>
            {slots.API ? <div class="api-container">{slots.API()}</div> : null}
          </div>
        </h2>
      </>
    );
  },
});
