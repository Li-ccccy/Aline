<template>
  <div>
    <!-- <div>
      <button @click="insertText">insert text</button>
      <button @click="printHtml">print html</button>
      <button @click="disable">disable</button>
    </div> -->
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
    <!-- <div style="margin-top: 10px">
      <textarea
        v-model="valueHtml"
        readonly
        style="width: 100%; height: 200px; outline: none"
      ></textarea>
    </div> -->
  </div>
</template>

<script lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import type { PropType } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IEditorConfig } from "@wangeditor/editor";
export default {
  props: {
    mode: {
      type: String,
      default: "default",
    },
    toolbarConfig: {
      type: String,
      default: {},
    },
    editorConfig: {
      type: Object as PropType<IEditorConfig>,
      default: { placeholder: "请输入内容..." },
    },
    valueHtml: {
      type: Object,
      default: null,
    },
    create: {
      type: Function,
      default: () => {},
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  components: { Editor, Toolbar },
  setup(props: any) {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();
    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });
    // 编辑器回调函数
    const handleCreated = (editor: any) => {
      // console.log("created", editor);
      props.create();
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor: any) => {
      props.change(editor.getHtml(), editor.getText());
    };
    const handleDestroyed = (editor: any) => {
      console.log("destroyed", editor);
    };
    const handleFocus = (editor: any) => {
      console.log("focus", editor);
    };
    const handleBlur = (editor: any) => {
      console.log("blur", editor);
    };
    //警告回调
    const customAlert = (info: any, type: any) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    // 复制粘贴回调
    const customPaste = (editor: any, event: any, callback: any) => {
      console.log("ClipboardEvent 粘贴事件对象", event);

      // 自定义插入内容
      // editor.insertText("xxx");
      // message.error('编辑器禁止粘贴')

      // 返回值（注意，vue 事件的返回值，不能用 return）
      // callback(false); // 返回 false ，阻止默认粘贴行为
      callback(true); // 返回 true ，继续默认的粘贴行为
    };

    return {
      editorRef,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
    };
  },
};
</script>
