//  布局组件,
import { defineComponent } from "vue";
import { css } from "@emotion/css";
type StackType = {
  inline?: {
    type: Boolean;
    default: true;
  };
  align?: String;
  justify?: String;
  wrap?: String;
  spacing?: String;
  style?: any;
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
