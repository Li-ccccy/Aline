import { defineComponent } from "vue";
import { css } from "@emotion/css";
import { Typography } from "ant-design-vue";
export default defineComponent({
  setup() {
    return () => {
      return (
        <>
          <Typography>
            <Typography.Title>文档基础介绍</Typography.Title>
          </Typography>
        </>
      );
    };
  },
});
