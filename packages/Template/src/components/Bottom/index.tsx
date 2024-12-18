import { defineComponent } from "vue";
import { css } from "@emotion/css";
export const Bottom = defineComponent({
  render() {
    return (
      <div
        class={css({
          fontSize: 16,
          color: "#000",
          position: "fixed",
          bottom: "50px",
          left: "50%",
          transform: "translate(-50%,-50%)",
        })}
      >
        Copyright © 2022 山西外星人技术有限公司
      </div>
    );
  },
});
