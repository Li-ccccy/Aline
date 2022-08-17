import { defineComponent } from "vue";
import type { PropType } from "vue";
import ECharts from "vue-echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";

type EChartProp = {
  EType: any; //echart的图表类型
};

export const EChart = defineComponent({
  props: {
    EType: {
      type: Object as PropType<EChartProp["EType"]>,
      required: true,
    },
    options: {
      type: Object,
    },
  },
  setup(props) {
    use([
      CanvasRenderer,
      props.EType,
      GridComponent,
      TooltipComponent,
      LegendComponent,
      TitleComponent,
    ]);
    return () => <ECharts option={props.options} autoresize></ECharts>;
  },
});
