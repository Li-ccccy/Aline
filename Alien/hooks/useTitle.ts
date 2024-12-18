import { useRoute } from "vue-router";
import { watchEffect } from "vue";
export const useTitle = (Name = "Aline组件库") => {
  const route = useRoute();
  setTitle(route.name as string, Name);
  watchEffect(() => {
    setTitle(route.name as string, Name);
  });
};

const setTitle = (name: string, Name?: string) => {
  name ? (document.title = `${name} - ${Name}`) : (document.title = `${Name}`);
};
