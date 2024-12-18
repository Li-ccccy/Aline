import { createVNode } from "vue";
import * as $Icon from "@ant-design/icons-vue";

export const Icon = (props: { icon: any }) => {
  const Icons = $Icon[props.icon];
  return createVNode(Icons);
};
