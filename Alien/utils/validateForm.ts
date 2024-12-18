import { toRaw } from "vue";
import IdentityCodeValid from "./idCardRule";
import { Rule } from "ant-design-vue/lib/form";
// 表单校验
export type AtLeastOne<T, U extends keyof T = keyof T> = {
  [K in U]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[U];

export const useValidate = ({
  formState,
  validate,
}: {
  formState: any;
  validate: any;
}) => {
  return new Promise<AtLeastOne<{ type: boolean }>>((resolve) => {
    validate()
      .then(() => {
        resolve({ ...toRaw(formState), type: true });
      })
      .catch((err: any) => {
        resolve({ ...err, type: false });
      });
  });
};

// 校验手机号。
export const validatePhone = async (_rule: Rule, value: number | null) => {
  if (value + "" == "" || value == null || value == undefined) {
    if (_rule.required) {
      return Promise.reject("请输入手机号");
    } else {
      return Promise.resolve();
    }
  }
  if (!/^1[3456789]\d{9}$/.test(value + "")) {
    return Promise.reject("请输入正确的手机号");
  } else {
    return Promise.resolve();
  }
};

// 校验身份证
export const validateIdCard = async (_rule: Rule, value: number) => {
  if (value + "" == "") {
    return Promise.reject("请输入身份证号");
  }
  if (!IdentityCodeValid(value)) {
    return Promise.reject("请输入正确的身份证号码");
  } else {
    return Promise.resolve();
  }
};

// 校验车牌号
export const validateCarId = async (_rule: Rule, value: string) => {
  var pattPlateNumber =
    /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;

  if (value == "") {
    return Promise.reject("请输入车牌号");
  }
  if (pattPlateNumber.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject("请输入正确的车牌号");
  }
};
