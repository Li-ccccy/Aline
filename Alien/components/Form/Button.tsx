import { defineComponent } from "vue";
import { Button } from "ant-design-vue";
export const FormButton = defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <Button>查询</Button>
          <Button>重置</Button>
        </div>
      );
    };
  },
});
