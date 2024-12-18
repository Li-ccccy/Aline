import { defineComponent, reactive } from "vue";
import { ProTable } from "@alien/components/Table/index";
import { getVisitorList } from "@/api/resources/vitior";
export const Nav = defineComponent({
  setup() {
    const formState = reactive({
      visitorName: "",
      phone: "",
      companyName: "",
      carNo: "",
    });
    const onSearch = () => {
      console.log(123);
    };
    const onResect = onSearch;
    const columns = [
      {
        title: "人员姓名",
        dataIndex: "visitorName",
        width: 140,
      },
      {
        title: "电话号",
        dataIndex: "phone",
        width: 140,
      },
      {
        title: "所属公司",
        dataIndex: "companyName",
        ellipsis: true,
      },
      {
        title: "头像",
        dataIndex: "visitorPortraitUrl",
        width: 80,
      },
      {
        title: "常用车牌",
        dataIndex: "carNo",
        width: 140,
      },
      {
        title: "入园次数",
        dataIndex: "comeNum",
        width: 120,
      },
      {
        title: "常拜访对象",
        dataIndex: "employeeName",
        width: 140,
      },
      {
        title: "所属部门",
        dataIndex: "employeeCompany",
        ellipsis: true,
      },
      {
        title: "常拜访类型",
        dataIndex: "employeeType",
        width: 120,
      },
    ];
    return () => {
      return (
        <div class="boxNav P20">
          <ProTable
            Api={getVisitorList}
            SearchForm={{
              layout: {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
              },
              model: formState,
              List: [
                {
                  type: "Text",
                  dataName: "visitorName",
                  label: "人员姓名",
                },
                {
                  type: "Text",
                  dataName: "phone",
                  label: "电话号",
                },
                {
                  type: "Text",
                  dataName: "companyName",
                  label: "公司",
                },
                {
                  type: "Text",
                  dataName: "carNo",
                  label: "车牌号",
                },
              ],
              onSearch: onSearch,
              onResect: onResect,
            }}
            TableProps={{
              columns: columns,
            }}
            FormateKey={{
              DataListKey: "data.result.records",
              totalKey: "data.result.total",
            }}
            TabSloat={{
              visitorPortraitUrl: (Data: any) => {
                return <div>{Data.text}</div>;
              },
            }}
          ></ProTable>
        </div>
      );
    };
  },
});

export default Nav;
