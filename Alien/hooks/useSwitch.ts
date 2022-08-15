// 切换true & false  的 hooks
import { ref, Ref } from "vue";
type Switch = [Ref<boolean>, () => void];
export const useSwitch = (type: boolean = false): Switch => {
  const trigger = ref(type);
  const setTrigger = () => {
    trigger.value = !trigger.value;
  };
  return [trigger, setTrigger];
};
