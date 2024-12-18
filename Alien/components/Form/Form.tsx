import { defineComponent, reactive, provide, inject, ref } from "vue";
import type { InjectionKey, PropType } from "vue";
import { Form as FormOrigin, FormProps, Button } from "ant-design-vue";
import { ItemList } from "./FromItemElemet";
import { creatrCompoent } from "./FromItemElemet";
import { cx, css } from "@emotion/css";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons-vue";
import { set, mapKeys } from "lodash";
//Form 的 props
interface Item {
  type: keyof creatrCompoent;
  dataName: string;
  label: string;
  other?: any;
}

export type ProFormProps = {
  List: Array<Item>;
  layout: any;
  onSearch?: () => void;
  onResect?: () => void;
};
// Form 的 hooks
const provideSymblKey = Symbol() as InjectionKey<{
  model: any;
  List: Array<Item>;
  Button: any;
}>;

export const userProForm = () => {
  return inject(provideSymblKey);
};

export const Form = defineComponent((props: ProFormProps & FormProps, ctx) => {
  const model = props.model || reactive({});
  const formRef = ref();
  const reset = () => {
    mapKeys(model, (_, key) => {
      set(model, key, "");
    });
    formRef.value.clearValidate();
    ctx.emit("resect");
  };
  const search = () => {
    ctx.emit("search");
  };
  provide(provideSymblKey, {
    model,
    List: props.List,
    Button: ctx.slots.default as any,
  });
  return () => {
    return (
      <FormOrigin
        model={model}
        ref={formRef}
        layout={"inline"}
        {...props?.layout}
        class={css({
          ">div": {
            width: "25%",
            marginRight: "0px !important",
            marginBottom: "20px !important",
          },
          ".ant-form-item-label": {
            width: 80,
          },
          ".ant-picker,.ant-picker-range": {
            width: "100%",
          },
        })}
      >
        <ItemList></ItemList>
        <FormOrigin.Item
          class={css({
            ".ant-col-16": {
              maxWidth: "100% !important",
            },
          })}
        >
          <Button
            type="primary"
            v-slots={{
              icon: () => <SearchOutlined></SearchOutlined>,
            }}
            onClick={search}
          >
            查询
          </Button>
          <Button
            type="ghost"
            class={css({
              marginLeft: 20,
            })}
            onClick={reset}
            v-slots={{
              icon: () => <ReloadOutlined></ReloadOutlined>,
            }}
          >
            重置
          </Button>
        </FormOrigin.Item>
      </FormOrigin>
    );
  };
});

Form.props = {
  List: Array as PropType<Array<Item>>,
  layout: Object,
  Search: Function,
  ...FormOrigin.props,
};
