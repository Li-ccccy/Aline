import { defineComponent } from "vue";
import { EChart, Stack } from "@alien/components";
import { PieChart } from "echarts/charts";
import { css } from "@emotion/css";
import style from "./echarts.module.css";
import CodeNav from "@/components/code";
import Code from "./code.vue";
import API from "./api.vue";
export const ChartCompoent = defineComponent({
  setup() {
    const EchartOptions = {
      title: {
        text: "Echarts 图表库",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "Echarts 图表库",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "Direct" },
            { value: 310, name: "Email" },
            { value: 234, name: "Ad Networks" },
          ],
        },
      ],
    };
    return () => (
      <>
        <EChart
          class={css({
            height: "360px",
            width: "360px",
          })}
          EType={PieChart}
          options={EchartOptions}
        ></EChart>
      </>
    );
  },
});

const ChartNav = defineComponent({
  setup() {
    return () => (
      <>
        <h1>Echarts 图表库</h1>
        <div>
          使用图表需安装 <span class={style.code}>@alien/components</span>
          组件包
        </div>
        <CodeNav
          v-slots={{
            code: <Code></Code>,
            API: <API></API>,
          }}
        >
          <Stack inline={true} justify={"center"} align={"center"}>
            <ChartCompoent></ChartCompoent>
          </Stack>
        </CodeNav>
      </>
    );
  },
});

export default ChartNav;
