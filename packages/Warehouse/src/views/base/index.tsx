import { defineComponent, ref, watch } from "vue";
import {
  Cascader,
  CascaderProps,
  Input,
  DatePicker,
  TimePicker,
  Button,
  Radio,
  Pagination,
  InputNumber,
  Rate,
  Space,
  Select,
  SelectOption,
  Slider,
  Switch,
} from "ant-design-vue";
import { EChart } from "@alien/components";
import { PieChart } from "echarts/charts";
import { css } from "@emotion/css";
import { auth, setAuth } from "@alien/utils";
export const Base = defineComponent({
  setup() {
    const options: CascaderProps["options"] = [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
              },
            ],
          },
        ],
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men",
              },
            ],
          },
        ],
      },
    ];
    const value = ref<string[]>([]);
    const checked1 = ref<boolean>(false);
    watch(value, () => {
      console.log(value.value);
    });
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
        left: "left",
        data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"],
      },
      series: [
        {
          name: "Traffic Sources",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "Direct" },
            { value: 310, name: "Email" },
            { value: 234, name: "Ad Networks" },
            { value: 135, name: "Video Ads" },
            { value: 1548, name: "Search Engines" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    console.log(auth.value);
    return { value, options, checked1, EchartOptions };
  },
  render() {
    return (
      <>
        <div>
          <EChart
            EType={PieChart}
            options={this.EchartOptions}
            class={css({
              width: "50vw",
              height: "400px",
            })}
          ></EChart>
          <Switch
            v-model:checked={this.checked1}
            checked-children="开"
            un-checked-children="关"
          ></Switch>
          <Slider range></Slider>
          <Space>
            <Select>
              <SelectOption value={1}>1</SelectOption>
              <SelectOption value={2}>2</SelectOption>
              <SelectOption value={3}>3</SelectOption>
            </Select>
          </Space>
          <Rate></Rate>
          <InputNumber></InputNumber>
          <Pagination total={50}></Pagination>
          <Radio>Radio</Radio>
          <Button
            type={"primary"}
            onClick={() => {
              setAuth(789);
            }}
          >
            123
          </Button>
          <TimePicker></TimePicker>
          <DatePicker picker={"quarter"} />
          <DatePicker picker={"month"} />
          <DatePicker picker={"week"} />
          <DatePicker />
          <Input></Input>
          <Cascader
            v-model:value={this.value}
            options={this.options}
          ></Cascader>
        </div>
      </>
    );
  },
});
export const Base2 = defineComponent({
  render() {
    return (
      <>
        <div>123</div>
      </>
    );
  },
});
export const Base3 = defineComponent({
  render() {
    return (
      <>
        <div
        // class={css({
        //   width: "100%",
        //   height: "100%",
        //   background: "#fff",
        // })}
        >
          我在测试3333
        </div>
      </>
    );
  },
});
