// tonken hooks
//
import { ref } from "vue";
type initial = string | object | Array<any>;
export const useLocation = (key: string, initialValue?: initial) => {
  const item = () => {
    const item = window.localStorage.getItem(key);
    return item
      ? JSON.parse(item)
      : initialValue
      ? (() => {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
          return initialValue;
        })()
      : null;
  };
  const state = ref(item());
  const setLocalStorageState = (newStateValue: initial) => {
    state.value = newStateValue;
    window.localStorage.setItem(key, JSON.stringify(newStateValue));
  };
  return [state, setLocalStorageState];
};
