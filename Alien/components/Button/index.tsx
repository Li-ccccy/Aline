import { defineComponent, reactive } from "vue";
import { Button } from "ant-design-vue";
interface Perpo {
  name: string;
  age: number;
}
export default defineComponent({
  setup() {
    const test = reactive<Perpo>({
      name: "abc",
      age: 10,
    });
  },
  render() {
    return <Button>测试</Button>;
  },
});
