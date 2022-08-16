// 获取和设置本地存储的hooks
import { ref, watch, Ref } from "vue";
type initial = number | string | object | Array<any>;
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
      : window.localStorage.getItem(key);
  };
  const state = ref(item());
  const setLocalStorageState = (newStateValue: initial) => {
    state.value = newStateValue;
    window.localStorage.setItem(key, JSON.stringify(newStateValue));
  };
  watch(state, (value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  });
  return [state, setLocalStorageState];
};
