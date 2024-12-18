import { defineComponent } from "vue";
import { Result } from "ant-design-vue";
const NotFind = defineComponent({
  setup() {
    return () => {
      return (
        <div class="boxNav P20">
          <Result
            status="404"
            title="404"
            sub-title="抱歉，无法找到当前页面。"
          ></Result>
        </div>
      );
    };
  },
});

export default NotFind;
