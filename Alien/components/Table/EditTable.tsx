import { defineComponent, reactive, ref, toRaw } from "vue";
import { Table, TableProps, TypographyLink, Popconfirm } from "ant-design-vue";
import { map, get, set, cloneDeep } from "lodash";
import { css, cx } from "@emotion/css";
import { creatrCompoent } from "../Form/FromItemElemet";
type EditProp = {
  defaultConfig?: TableProps;
  className?: string;
  editKey?: Array<string>;
};

export const EditTable = defineComponent((props: EditProp, ctx) => {
  // 可开启编辑的表头
  const openEditKey =
    props?.editKey ||
    map(props.defaultConfig?.columns, (item: any) => {
      return item.dataIndex;
    });
  //  开启编辑的内容
  const editableData: any = reactive({});
  ctx.expose({
    editableData,
  });
  return () => {
    return (
      <Table
        {...props.defaultConfig}
        columns={[
          ...(props.defaultConfig?.columns as Array<any>),
          { title: "操作", dataIndex: "operation", fixed: "right" },
        ]}
        class={cx(
          `${props?.className}`,
          css({
            table: { border: "1px solid #f0f0f0", borderBottom: "none" },
            "& .ant-table-tbody::-webkit-scrollbar": {
              display: "block !important",
            },
          })
        )}
      >
        {{
          bodyCell: ({ column, text, record }: any) => {
            // 是否开启编辑
            if (
              openEditKey.includes(column.dataIndex) &&
              editableData[record.id]
            ) {
              let Item = creatrCompoent[record.editType];
              return (
                <Item
                  value={get(editableData[record.id], column.dataIndex)}
                  onUpdate:value={(val: any) => {
                    set(editableData[record.id], column.dataIndex, val);
                  }}
                  {...record.other}
                ></Item>
              );
            } else {
              if (column.dataIndex == "operation") {
                return editableData[record.id] ? (
                  <span>
                    <TypographyLink
                      class={css({
                        marginRight: 20,
                      })}
                      onClick={() => {
                        Object.assign(record, editableData[record.id]);
                        delete editableData[record.id];
                      }}
                    >
                      保存
                    </TypographyLink>
                    <Popconfirm
                      title="确定取消修改？"
                      onConfirm={() => delete editableData[record.id]}
                    >
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <a
                    onClick={() => {
                      editableData[record.id] = cloneDeep(record);
                    }}
                  >
                    编辑
                  </a>
                );
              }
              // 没有开启可编辑的，直接按slot或者默认的span展示
              return ctx.slots.bodyCell
                ? ctx.slots.bodyCell({ column, text, record })
                : null;
            }
          },
        }}
      </Table>
    );
  };
});

EditTable.props = {
  defaultConfig: Object,
  className: String || undefined,
  editKey: Array,
};
