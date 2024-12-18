# 表格+搜索+分页组件

组件地址：Aline/components/Table
三方组件：antd

| 参数名称   | 类型     | 说明                                                                                                                                               |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Api        | object   | axios 暴漏得接口函数                                                                                                                               |
| SearchForm | object   | SearchForm 相关得参数                                                                                                                              |
| onSearch   | function | 搜索回调                                                                                                                                           |
| FormateKey | object   | totalKey:后端返回的总数的字段；page；SizeKey：后端返回的每页条数的 key.；currentKey:后端返回的当前页数的 key.；DataListKey：后端返回的数据的字段。 |
| TableProps | Object   | columns:表头。；rowKey：每条数据的唯一值。；rowSelection：是否开启选择。                                                                           |
| PageConfig | object   | pageSize: 每页条数。；position：位置。 默认在右下; hidden\:bollen 是否隐藏分页器                                                                   |
| TabSloat   | slots    | 操作得插槽内容                                                                                                                                     |

---
