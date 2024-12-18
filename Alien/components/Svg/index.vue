<template>
  <span class="anticon anticon-home ant-menu-item-icon">
    <svg
      aria-hidden="true"
      class="svg-icon"
      :width="props?.width || props.size"
      :height="props?.height || props.size"
    >
      <use :xlink:href="symbolId" :fill="props.color" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  height: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: null,
  },
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  size: {
    type: String,
    default: "16px",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
// import ids from 'virtual:svg-icons-names' 获取所有图标
</script>
