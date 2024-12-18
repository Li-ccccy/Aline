import { defineComponent, onMounted } from "vue";
import { css } from "@emotion/css";
import * as live2d from "live2d-render";
export const Home = defineComponent({
  setup() {
    onMounted(async () => {
      await live2d.initializeLive2D({
        BackgroundRGBA: [0.0, 0.0, 0.0, 0.0],
        ResourcesPath: "/xiaohuihuizuizhong/Xiaohuihui.model3.json",
        CanvasSize: {
          height: 500,
          width: 400,
        },
      });
      console.log("finish loading");
    });
    return () => {
      return (
        <div>
          <div
            class={css({
              background: "-webkit-linear-gradient(320deg,#42d392 18%,#647eff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: 60,
            })}
          >
            Hello,欢迎使用 E-T-PicTank
          </div>
          <div>
            鉴于别的开源后台管理都是一堆组件摆上来，很酷炫～ 没办法
            首页我就不放那些东西了 👹 💣
          </div>
        </div>
      );
    };
  },
});

export default Home;
