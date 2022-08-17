import { useRoute } from "vue-router";
import { watch, watchEffect } from "vue";
export const useTitle = () => {
  const route = useRoute();
  setTitle(route.name as string);
  watchEffect(() => {
    setTitle(route.name as string);
  });
};

const setTitle = (name: string) => {
  document.title = `${name} - Aline组件库`;
};
