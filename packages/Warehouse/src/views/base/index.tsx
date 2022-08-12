import { defineComponent } from "vue";
import { css } from "@emotion/css";
export const Base = defineComponent({
  render() {
    return (
      <>
        <div
        // class={css({
        //   width: "100%",
        //   height: "100%",
        //   background: "#fff",
        // })}
        >
          我在测试
        </div>
      </>
    );
  },
});
