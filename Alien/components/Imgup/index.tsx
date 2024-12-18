import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { defineComponent, ref, watch } from "vue";
import type { PropType } from "vue";
import type { UploadChangeParam } from "ant-design-vue";
import { Upload } from "ant-design-vue";
import { css } from "@emotion/css";
import "./index.modul.css";
export function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.addEventListener("load", () => callback(reader.result as string));
}

export const ImgUp = defineComponent({
  props: {
    defaultUrl: {
      type: String as PropType<string>,
      default: "",
      required: true,
    },
    maxSize: {
      type: Number as PropType<number>,
      default: 1024 * 1024 * 2,
    },
    msg: {
      type: String as PropType<string>,
      default: "",
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
    const file = ref([]);
    const imageUrl = ref<string>("");
    watch(
      () => props.defaultUrl,
      () => {
        imageUrl.value = props.defaultUrl;
      }
    );
    const loading = ref<boolean>(false);

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === undefined) {
        // 没有status代表上传失败，需要清除上传列表中的最后一个
        file.value = file.value.slice(0, -1);
        return;
      }

      if (info.file.status === "uploading") {
        loading.value = true;
        return;
      }
      if (info.file.status === "done") {
        if (info.file.response.code != 200) {
          message.error(info.file.response.message);
          return false;
        }
        message.success("上传成功");
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
        // fileList上传列表，没有做清空操作，每次上传，都会叠加，所以取fileList数组最后一个
        props.changeFile(info.fileList[info.fileList.length - 1].response);
      }
      if (info.file.status === "error") {
        loading.value = false;
        message.error("upload error");
      }
    };
    const beforeUpload = (file: any) => {
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
      return isJpgOrPng && isLt2M;
    };

    return () => {
      return (
        <>
          <Upload
            v-model:fileList={file.value}
            accept={props.accept}
            name={"file"}
            listType={"picture-card"}
            class="avatar-uploader"
            showUploadList={false}
            headers={props.headers}
            action={props.action}
            beforeUpload={beforeUpload}
            onChange={handleChange}
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
          {props.msg ? (
            <p
              class={css({
                fontSize: 14,
                color: "#989898",
              })}
            >
              {props.msg}
            </p>
          ) : null}
        </>
      );
    };
  },
});
