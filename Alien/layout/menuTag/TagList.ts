import { ref, nextTick } from "vue";
import { useRoute } from "vue-router";
export type TagItem = {
  name: string;
  path: string;
  EventBus: Array<EventBus>;
};

type EventBus = {
  title: string; // 事件名称,
  event: any; // 触发的点击事件
};

// tag 的关闭事件
export const tagClose = (T: TagItem, Routepath: string, Router: any) => {
  if (TagObj.TagList.value.length == 1) {
    return;
  } else {
    let TargetIndex = TagObj.TagList.value.findIndex((target) => {
      return target.path == T.path;
    });
    if (Routepath == TagObj.TagList.value[TargetIndex].path) {
      Router.push(
        TagObj.TagList.value[TargetIndex - 1]?.path ||
          TagObj.TagList.value[TargetIndex + 1].path
      );
    }
    TagObj.TagList.value.splice(TargetIndex, 1);
  }
};

// tag 的刷新事件 refush

export const TagRfush = (Routepath: string, Router: any) => {
  let TargetIndex = TagObj.TagList.value.findIndex((target) => {
    return target.path == Routepath;
  });
  let name = TagObj.TagList.value[TargetIndex].name;
  TagObj.TagList.value[TargetIndex].name = name + " ";
  Router.replace({ path: `/redict${Routepath}` });
  setTimeout(() => {
    TagObj.TagList.value[TargetIndex].name = name;
  });
};
export const TagObj = {
  TagList: ref<Array<TagItem>>([]),
  onClose: (T: any) => {},
};
