<template>
  <h2>Button 按钮</h2>
  <CodeNav>
    <template v-slot:code>
      <!-- header 插槽的内容放这里 -->
      <Code></Code>
    </template>
    <template v-slot:API>
      <!-- header 插槽的内容放这里 -->
      <API></API>
    </template>
    <a-radio-group v-model:value="size">
      <a-radio-button value="large">Large</a-radio-button>
      <a-radio-button value="default">Default</a-radio-button>
      <a-radio-button value="small">Small</a-radio-button>
    </a-radio-group>
    <br />
    <br />
    <div class="btnNav">
      <a-button type="primary" :size="size">Primary</a-button>
      <a-button :size="size">Normal</a-button>
      <a-button type="dashed" :size="size">Dashed</a-button>
      <a-button danger :size="size">Danger</a-button>
      <a-button type="link" :size="size">Link</a-button>
      <a-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" shape="circle" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>
      <a-button type="primary" shape="round" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
      </a-button>
      <a-button type="primary" :size="size">
        <template #icon>
          <DownloadOutlined />
        </template>
        Download
      </a-button>
    </div>
    <br />
  </CodeNav>
</template>
<script lang="ts">
import API from "./api.vue";
import Code from "./code.vue";
import CodeNav from "@/components/code";
import { DownloadOutlined } from "@ant-design/icons-vue";
import type { SizeType } from "ant-design-vue/es/config-provider";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    DownloadOutlined,
    CodeNav,
    Code,
    API,
  },
  setup() {
    return {
      size: ref<SizeType>("large"),
    };
  },
});
</script>
<style scoped lang="less">
.btnNav {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  button {
    margin-right: 10px;
  }
}
</style>
