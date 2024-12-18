import { isArray } from "lodash";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export const Redict = defineComponent({
  setup() {
    const Route = useRoute();
    const Router = useRouter();
    let path = "";
    if (isArray(Route.params.fullpath)) {
      Route.params.fullpath.map((item: string) => {
        path += `/${item}`;
      });
      Router.replace(path);
    }
    return () => {
      return <div></div>;
    };
  },
});
