import { defineComponent } from "vue";
import { Button } from "ant-design-vue";

export default defineComponent({
  props: {
    name: String,
  },
  render() {
    return <Button danger>测试123</Button>;
  },
});
