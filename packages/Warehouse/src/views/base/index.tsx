import { defineComponent, ref, watch } from "vue";
import { Cascader, CascaderProps, Input } from "ant-design-vue";
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
    watch(value, () => {
      console.log(value.value);
    });
    return { value, options };
  },
  render() {
    return (
      <>
        <div>
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
