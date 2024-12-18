//  布局组件,
import { defineComponent } from "vue";
import { css } from "@emotion/css";
type StackType = {
  inline?: Boolean; // 排列方向
  align?: String;
  justify?: String;
  wrap?: String; // 换行
  spacing?: String | number; // 间距
  style?: any; // 样式
};

export const Stack = defineComponent((props: StackType, context: any) => {
  return () => {
    return (
      <div
        class={css({
          display: "flex",
          flexDirection: props.inline ? "row" : "column",
          alignItems: props.align,
          justifyContent: props.justify,
          flexWrap: props.wrap,
          ...(props.inline
            ? {
                "& > * + *": { marginLeft: props.spacing },
              }
            : {
                "& > * + *": { marginTop: props.spacing },
              }),
          ...context.attrs?.style,
        })}
      >
        {context.slots.default ? context.slots.default() : null}
      </div>
    );
  };
});

Stack.props = {
  inline: {
    type: Boolean,
    default: true,
  },
  align: String,
  justify: String,
  wrap: String,
  spacing: String,
};
