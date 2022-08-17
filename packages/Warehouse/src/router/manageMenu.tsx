import { Base, Base2, Base3 } from "@/views/base/index";
import Docs from "@/views/docs/router";
import { DingdingOutlined, AlignLeftOutlined } from "@ant-design/icons-vue";
export default [
  Docs,
  {
    path: "/manage/base1",
    name: "测试1",
    icon: <AlignLeftOutlined></AlignLeftOutlined>,
    children: [
      {
        name: "测试2",
        path: "/manage/base1/base2",
        component: Base,
        icon: <DingdingOutlined></DingdingOutlined>,
      },
      {
        name: "测试3",
        path: "/manage/base1/base3",
        component: Base3,
        icon: <DingdingOutlined></DingdingOutlined>,
      },
    ],
  },
];
