import { defineComponent, PropType } from "vue";
import { Stack } from "../index";

export const SearList = defineComponent({
  setup(_, ctx) {
    return () => (
      <Stack justify={"start"} align={"center"} spacing={25}>
        <SearchItem></SearchItem>
      </Stack>
    );
  },
});

interface Item {
  type: "input" | "select" | "timer";
  name: string;
  mode?: string;
}
const ItemProps = {
  searchList: {
    type: Array as PropType<Array<Item>>,
  },
};

const SearchItem = defineComponent({
  props: ItemProps,
  setup() {
    return () => <div>123</div>;
  },
});
