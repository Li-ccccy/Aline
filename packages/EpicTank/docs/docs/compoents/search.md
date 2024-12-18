# 搜索表单

组件地址：Aline/components/Form
三方组件：基于 antd-vue 3.2
所需参数：

| 参数名称 | 类型         | 说明   |
| -------- | ------------ | ------ |
| List     | Array\[ {} ] | 见下方 |

```javascript
type:
  Text: Input, // 默认输入框
  Textarea: Textarea, //文本输入框
  Password: InputPassword, // 密码输入框
  Number: InputNumber, // 数字输入框
  Select: Select, // 下拉选择
  RangePicker: RangePicker, // 开始时间-结束时间
  CheckboxGroup: CheckboxGroup, // 多选组
--------
dataName: 绑定的字段名
---------
label: 名称
----------
hidden: 是否是隐藏搜索
----------
other:  antd对应类型的各种配置
```

|          |          | Text}                   |
| :------- | :------- | ----------------------- |
| layout   | Object   | 参考 antdvue 的表单布局 |
| onSearch | Function | 搜索的回调事件          |
| onResect | Function | 重置的回调事件          |
