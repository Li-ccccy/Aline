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
    return { value, options, checked1 };
  },
  render() {
    return (
      <>
        <div>
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
          <Button type={"primary"}>123</Button>
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
