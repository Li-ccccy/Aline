Api: 封装的接口请求。
SearchForm：{
------layout：布局，
------model：搜索的内容，
------List：搜索的内容。:
{
type: "Text", -----类型
dataName: "visitorName", ----绑定的搜索的内容值
label: "姓名", ---- label 内容值。
},
onSearch:搜索回调，
onResect：重置回调。
}

FormateKey：{
totalKey:后端返回的总数的字段.
pageSizeKey：后端返回的每页条数的 key.
currentKey:后端返回的当前页数的 key.
DataListKey：后端返回的数据的字段。
}

TableProps:{
columns:表头。
rowKey：每条数据的唯一值。
rowSelection：是否开启选择。
}

PageConfig：{
pageSize: 每页条数。
position：位置。 默认在右下。
}
className： 样式名字

TabSloat： 插槽内容。
