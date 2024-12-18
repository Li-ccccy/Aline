<template>
  <vue3-seamless-scroll
    :list="Data"
    :direction="direction"
    :hover="hover"
    :limitScrollNum="limitScrollNum"
    :step="step"
    :singleHeight="singleHeight"
    :singleWidth="singleWidth"
    :singleWaitTime="singleWaitTime"
    class="scroll"
  >
    <slot></slot>
  </vue3-seamless-scroll>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import type { PropType } from "vue";
export default defineComponent({
  name: "App",
  props: {
    Data: Array,
    direction: {
      type: String as PropType<"up" | "down" | "left" | "right" | undefined>,
      default: "up",
    },
    hover: {
      type: Boolean,
      default: true,
    },
    limitScrollNum: {
      type: Number,
      default: 5,
      required: false,
    },
    step: {
      type: Number,
      required: false,
    },
    singleHeight: {
      type: Number,
      default: 100,
      required: false,
    },
    singleWidth: {
      type: Number,
      default: 0,
      required: false,
    },
    singleWaitTime: {
      type: Number,
      default: 1000,
      required: false,
    },
  },
  components: {
    Vue3SeamlessScroll,
  },
});
</script>

<style scoped>
.scroll {
  overflow: hidden;
}
</style>
