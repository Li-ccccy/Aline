import { defineComponent, watch } from "vue";
import { Table, FormProps } from "ant-design-vue";
import type { ProFormProps } from "../Form/Form";
import { usePagination } from "vue-request";
import { Form as SearchForm } from "../Form/index";
import { css, cx } from "@emotion/css";
import Laodsh from "lodash";
import { TablePaginationConfig } from "ant-design-vue";
type ProTableProps = {
  Api: any;
  FormateKey: {
    totalKey?: string;
    pageSizeKey?: string;
    currentKey?: string;
    DataListKey: string;
  };
  SearchForm: ProFormProps & { model: any };
  TableProps: {
    columns: Array<any>;
    rowKey?: string;
    rowSelection?: any;
  };
  PageConfig?: {
    hidden?: boolean;
    pageSize?: number;
    position?: TablePaginationConfig["position"];
  };
  className?: string;
  TabSloat: any;
  TabScroll?: {
    x?: string | number | true | undefined;
    y?: string | number | undefined;
  };
};

enum DefalutPageKeys {
  SizeKey = "pageSize",
  Size = "10",
  CurrentKey = "pageNo",
  TotalKey = "data.result.total",
}

export const ProTable = defineComponent((props: ProTableProps, ctx) => {
  // 分页事件
  const PageChage = (index: number) => {
    if (index == current.value) {
      return;
    }
    current.value = index;
  };
  const showSizeChange = (_: any, psize: any) => {
    pageSize.value = psize;
  };
  const { run, data, current, total, loading, pageSize } = usePagination(
    (obj) => {
      return props.Api({
        ...props.SearchForm.model,
        ...obj,
      });
    },
    {
      defaultParams: [
        {
          [props?.FormateKey?.pageSizeKey || DefalutPageKeys.SizeKey]:
            props.PageConfig?.pageSize || DefalutPageKeys.Size,
        },
      ],
      pagination: {
        currentKey: props?.FormateKey?.currentKey || DefalutPageKeys.CurrentKey,
        pageSizeKey: props?.FormateKey?.pageSizeKey || DefalutPageKeys.SizeKey,
        totalKey: props?.FormateKey?.totalKey || DefalutPageKeys.TotalKey,
      },
    }
  );
  const onSearch = () => {
    return run({
      [props?.FormateKey?.pageSizeKey || DefalutPageKeys.SizeKey]:
        props.PageConfig?.pageSize || DefalutPageKeys.Size,
      [props?.FormateKey?.currentKey || DefalutPageKeys.CurrentKey]: 1,
    });
  };
  const BodyCall = (Data: any) => {
    let TabSloat = props?.TabSloat || {};
    return TabSloat[Data.column.dataIndex]
      ? TabSloat[Data.column.dataIndex](Data)
      : null;
  };
  ctx.expose({
    onSearch,
  });
  // watch(
  //   () => props.TableProps.rowSelection.selectedRowKey,
  //   () => {
  //     console.log("发生改变", props?.TableProps?.rowSelection.selectedRowKey);
  //   }
  // );
  return () => {
    return (
      <>
        {/* 搜索组件 */}
        <SearchForm
          {...props.SearchForm}
          onSearch={onSearch}
          onResect={onSearch}
        ></SearchForm>
        {/* 操作按钮的插槽 */}
        {ctx.slots.default && ctx.slots.default()}
        {/* 表格组件 */}
        <Table
          size="small"
          loading={loading.value}
          dataSource={
            data.value
              ? Laodsh.get(data.value, props.FormateKey.DataListKey)
              : null
          }
          rowKey={props.TableProps?.rowKey || "id"}
          pagination={
            props?.PageConfig?.hidden
              ? !props?.PageConfig?.hidden
              : {
                  total: total.value,
                  current: current.value,
                  position: props?.PageConfig?.position || ["bottomRight"],
                  pageSize: pageSize.value,
                  onChange: PageChage,
                  showTotal: (total) => `共 ${total} 条数据`,
                  onShowSizeChange: showSizeChange,
                }
          }
          columns={props.TableProps.columns}
          rowSelection={props?.TableProps?.rowSelection || null}
          scroll={props.TabScroll || undefined}
          class={cx(
            `${props?.className}`,
            css({
              table: { border: "1px solid #f0f0f0", borderBottom: "none" },
              ".ant-table-body": {
                "::-webkit-scrollbar": {
                  display: "contents",
                  width: 8,
                  height: 8,
                  "background-color": "#00000040",
                },
                "::-webkit-scrollbar-thumb": {
                  display: "contents",
                  width: 8,
                  height: 8,
                  borderRadius: 12,
                  "background-color": "var(--Dant-primary-color)",
                },
              },
              ".ant-table-content": {
                "::-webkit-scrollbar": {
                  display: "contents",
                  width: 8,
                  height: 8,
                  "background-color": "#00000040",
                },
                "::-webkit-scrollbar-thumb": {
                  display: "contents",
                  width: 8,
                  height: 8,
                  borderRadius: 12,
                  "background-color": "var(--Dant-primary-color)",
                },
              },
            })
          )}
          v-slots={
            props.TabSloat
              ? {
                  bodyCell: BodyCall,
                }
              : ctx.slots
          }
          sticky={true}
        ></Table>
      </>
    );
  };
});

ProTable.props = {
  SearchForm: Object,
  TableProps: Object,
  Api: Function,
  className: String,
  PageConfig: Object,
  TabSloat: Object,
  TabScroll: Object,
  FormateKey: Object,
};
