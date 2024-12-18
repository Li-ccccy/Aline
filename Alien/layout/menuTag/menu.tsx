import { defineComponent } from "vue";
import type { PropType } from "vue";
import { css } from "@emotion/css";
export const Menu = defineComponent({
  props: {
    position: {
      type: Object as PropType<{
        left: number;
        top: number;
        Show: boolean;
        EventList: Array<any>;
      }>,
      defalut: {
        left: 0,
        top: 0,
        Show: false,
        EventList: [],
      },
    },
  },
  setup(props) {
    return () => {
      return (
        <ul
          class={css({
            display: props.position?.Show ? "block" : "none",
            position: "fixed",
            left: props.position?.left,
            top: props.position?.top,
            margin: 0,
            background: "#fff",
            zIndex: 3000,
            listStyleType: "none",
            padding: "5px 0",
            borderRadius: "4px",
            fontSize: 12,
            color: "#333",
            webkitBoxShadow: "2px 2px 3px 0 rgb(0 0 0 / 30%)",
            boxShadow: "2px 2px 3px 0 rgb(0 0 0 / 30%)",
            li: {
              margin: 0,
              padding: "7px 16px",
              cursor: "pointer",
            },
            "li:hover": {
              backgroundColor: "#eee",
            },
          })}
        >
          {props.position?.EventList.map((item) => {
            return <li onClick={item.event}>{item.title}</li>;
          })}
        </ul>
      );
    };
  },
});
