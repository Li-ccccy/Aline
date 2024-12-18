import { defineComponent, provide, inject, ref } from "vue";
import type { InjectionKey, Ref } from "vue";
import type { otherThemType } from "@alien/hooks/index";
import ThemList from "@/config/themConfig";
import { userThem } from "@alien/hooks";

const provideSymblKey = Symbol() as InjectionKey<{
  themList: otherThemType;
  setTheme: (T: number) => void;
  headerMenu: Ref<boolean>;
  setheaderMenu: (T: boolean) => void;
}>;

export const ThemeProvide = () => {
  return inject(provideSymblKey);
};

export default defineComponent({
  setup(_, context) {
    const [themList, setTheme] = userThem(ThemList);
    const showHeaderMenu = ref(false);
    const setheaderMenu = (type: boolean) => {
      showHeaderMenu.value = type;
    };
    provide(provideSymblKey, {
      themList,
      setTheme,
      headerMenu: showHeaderMenu,
      setheaderMenu,
    });
    return () => {
      return <>{context.slots.default ? context.slots.default() : null}</>;
    };
  },
});
