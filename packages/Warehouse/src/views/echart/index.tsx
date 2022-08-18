import { defineComponent } from "vue";
import { EChart } from "@alien/components";
import { PieChart } from "echarts/charts";
import { Stack } from "@alien/components";
import { css } from "@emotion/css";
export const ChartCompoent = defineComponent({
  setup() {
    const EchartOptions = {
      title: {
        text: "Traffic Sources",
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
          name: "Traffic Sources",
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
        <Stack inline={true} justify={"flex-start"} align={"center"}>
          <ChartCompoent></ChartCompoent>
        </Stack>
      </>
    );
  },
});

export default ChartNav;
