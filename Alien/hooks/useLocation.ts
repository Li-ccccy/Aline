// 获取和设置本地存储的hooks
import { ref } from "vue";
import type { Ref } from "vue";
export type initial = number | string | object | Array<any> | any;
export const useLocation = (
  key: string,
  initialValue?: initial
): [Ref<any>, (I: initial) => void] => {
  const item = () => {
    return initialValue
      ? (() => {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
          return initialValue;
        })()
      : window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key) as string)
      : null;
  };
  const state = ref(item());
  const setLocalStorageState = (newStateValue: initial) => {
    state.value = newStateValue;
    window.localStorage.setItem(key, JSON.stringify(newStateValue));
  };
  return [state, setLocalStorageState];
};
