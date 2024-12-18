import { defineComponent, ref, shallowRef, reactive, watch } from "vue";
import type { PropType } from "vue";
import { VueCropper } from "vue-cropper";
import { Upload, Button, Modal, message } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import "vue-cropper/dist/index.css";
import { css } from "@emotion/css";
import { getBase64 } from "./index";
export const CroppingImg = defineComponent({
  props: {
    defaultUrl: {
      type: String as PropType<string>,
      default: "",
    },
    maxSize: {
      type: Number as PropType<number>,
      default: 1024 * 1024 * 2,
    },
    msg: {
      type: String as PropType<string>,
      default: "只能上传jpg/png格式的图片，且不超过2M。",
    },
    action: {
      type: String as PropType<string>,
      default: import.meta.env.VITE_APP_BASEURL,
    },
    headers: {
      type: Object as PropType<any>,
    },
    changeFile: {
      type: Function,
      default: () => {},
    },
    accept: {
      type: String,
      default: "image/jpg, image/jpeg, image/png",
    },
  },
  setup(props) {
    const img = ref();
    const fileList = ref([]);
    const File = reactive({
      file: null as string | ArrayBuffer | null,
      name: "",
      type: "",
    });
    const cropper = shallowRef();
    let Padding: any;
    const beforeUpload = (file: any) => {
      const { name, type } = file;
      Object.assign(File, { name, type });
      const isJpgOrPng =
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("只支持jpg与png格式的图片");
        // 官网API提示beforeUpload return false可以停止上传，但貌似不行
        return false;
      }
      const isLt2M = file.size < props.maxSize;
      if (!isLt2M) {
        message.error(props.msg);
      }
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        visible.value = true;
        reader.onload = () => {
          File.file = reader.result;
          Padding = (EvetFile: any) => {
            resolve(EvetFile);
          };
        };
      });
    };
    const Up = () => {
      cropper.value.getCropBlob((res: any) => {
        getBase64(res, (data) => {
          img.value = data;
        });
        let file = new window.File([res], File.name, {
          type: File.type,
          lastModified: Date.now(),
        });
        Padding(file);
      });
    };
    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === undefined) {
        // 没有status代表上传失败，需要清除上传列表中的最后一个
        fileList.value = fileList.value.slice(0, -1);
        return;
      }

      if (info.file.status === "uploading") {
        loading.value = true;
        return;
      }
      if (info.file.status === "done") {
        if (info.file.response.status != 200) {
          message.error(info.file.response.message);
          return false;
        }
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
        message.success("上传成功");
        visible.value = false;
        // fileList上传列表，没有做清空操作，每次上传，都会叠加，所以取fileList数组最后一个
        props.changeFile(info.fileList[info.fileList.length - 1].response);
      }
      if (info.file.status === "error") {
        loading.value = false;
        message.error("upload error");
      }
    };

    const visible = ref(false);

    const imageUrl = ref<string>("");
    watch(
      () => props.defaultUrl,
      () => {
        imageUrl.value = props.defaultUrl;
      }
    );
    const loading = ref<boolean>(false);
    return () => {
      return (
        <>
          <Upload
            accept={props.accept}
            v-model:fileList={fileList.value}
            beforeUpload={beforeUpload}
            name={"file"}
            listType={"picture-card"}
            headers={props.headers}
            action={props.action}
            onChange={handleChange}
            class="avatar-uploader"
            showUploadList={false}
          >
            {imageUrl.value ? (
              <img
                src={imageUrl.value}
                alt="avatar"
                class={css({
                  width: "100%",
                })}
              />
            ) : (
              <div>
                {loading.value ? (
                  <LoadingOutlined></LoadingOutlined>
                ) : (
                  <PlusOutlined></PlusOutlined>
                )}
                <div class="ant-upload-text">上传</div>
              </div>
            )}
          </Upload>
          <Modal v-model:visible={visible.value} title="裁剪图片" onOk={Up}>
            <div
              class={css({
                width: 470,
                height: 400,
              })}
            >
              <VueCropper
                ref={cropper}
                autoCrop={true}
                img={File.file}
              ></VueCropper>
            </div>
          </Modal>
        </>
      );
    };
  },
});
