import { defineComponent, reactive } from "vue";
import { Form } from "@alien/components";
export const Home = defineComponent({
  name: "ProTable",
  setup() {
    const model = reactive({
      personnelName: "",
      punishmentMethod: "",
    });
    // 违规类选项
    const punishmentMethodList = [
      {
        value: "",
        label: "全部",
      },
      {
        value: 0,
        label: "口头警告",
      },
      {
        value: 1,
        label: "罚款",
      },
      {
        value: 2,
        label: "黑名单",
      },
    ];
    const Config = {
      List: [
        {
          type: "Text",
          dataName: "personnelName",
          label: "人员姓名",
        },
        {
          type: "Select",
          dataName: "punishmentMethod",
          label: "处罚方式",
          other: {
            options: punishmentMethodList,
          },
        },
      ],
      model,
      layout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      },
    };
    return () => {
      return (
        <div>
          <Form {...Config}></Form>
        </div>
      );
    };
  },
});

export default Home;
