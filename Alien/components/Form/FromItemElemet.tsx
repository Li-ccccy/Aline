import { defineComponent } from "vue";
import { userProForm } from "./Form";
import { get, set } from "lodash";
import {
  FormItem,
  Input,
  InputNumber,
  InputPassword,
  Textarea,
  Select,
  RangePicker,
  CheckboxGroup,
  RadioGroup,
} from "ant-design-vue";
export const ItemList = defineComponent({
  setup() {
    const FormProps = userProForm();
    return () => (
      <>
        {FormProps?.List.map((Item) => {
          let Items = creatFormList({ ...Item, model: FormProps.model });
          return <Items></Items>;
        })}
        {FormProps ? (FormProps.Button ? FormProps.Button() : null) : null}
      </>
    );
  },
});

export const creatrCompoent = {
  Text: Input, // 默认输入框
  Textarea: Textarea, //文本输入框
  Password: InputPassword, // 密码输入框
  Number: InputNumber, // 数字输入框
  Select: Select, // 下拉选择
  RangePicker: RangePicker, // 开始时间-结束时间
  CheckboxGroup: CheckboxGroup, // 多选组
  RadioGroup: RadioGroup, //单选组
};
/**
 *
 * @param Component     input 组件
 * @param defineProps   otherProps
 */

type Argenu = {
  type: keyof typeof creatrCompoent;
  dataName: string;
  label: string;
  model: any;
  other?: any;
};
const creatFormList = ({ type, dataName, label, model, other }: Argenu) => {
  return defineComponent({
    setup() {
      const Item = creatrCompoent[type];
      return () => {
        return (
          <FormItem name={dataName} label={label}>
            <Item
              value={get(model, dataName)}
              onUpdate:value={(val: any) => {
                set(model, dataName, val);
              }}
              allowClear
              {...other}
              size="small"
            ></Item>
          </FormItem>
        );
      };
    },
  });
};
