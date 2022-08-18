import { defineComponent } from "vue";
import { css } from "@emotion/css";
import { Typography, Divider, Image } from "ant-design-vue";
import { GithubFilled } from "@ant-design/icons-vue";
import { Stack } from "@alien/components";
import FiblieImg from "@/assets/img/docs.png";
// 基础文档
const FilContaner = defineComponent({
  setup() {
    return () => {
      return (
        <>
          <div
            class={css({
              position: "relative",
            })}
          >
            <Typography.Link
              class={css({
                position: "absolute",
                right: 20,
                top: 0,
              })}
              href="https://github.com/Li-ccccy/Aline"
              target="_blank"
            >
              <GithubFilled
                class={css({
                  color: "#000",
                  fontSize: "20px",
                })}
              ></GithubFilled>
            </Typography.Link>
          </div>
          <Typography>
            <Typography.Title level={3}>基础框架介绍</Typography.Title>
            <Typography.Paragraph>
              1.
              此组件库是公用后台管理框架的封装组件。（后续持续更新二次封装的组件）
            </Typography.Paragraph>
            <Typography.Paragraph>
              2. 技术栈：
              <Typography.Link href="https://vitejs.cn/" target="blank">
                vite
              </Typography.Link>
              、
              <Typography.Link href="https://cn.vuejs.org/" target="blank">
                vue3.2.x
              </Typography.Link>
              、
              <Typography.Link
                href="https://router.vuejs.org/zh/"
                target="blank"
              >
                vue-router 4.x
              </Typography.Link>
              , Typescript、tsx、jsx 、模版语法 编码支持。
            </Typography.Paragraph>
            <Typography.Paragraph>
              3. UI组件是基于
              <Typography.Link href="https://www.antdv.com/" target="blank">
                antd-vue(3.x)
              </Typography.Link>
              、 图表库基于
              <Typography.Link
                href="https://github.com/ecomfe/vue-echarts/blob/HEAD/README.zh-Hans.md"
                target="blank"
              >
                vue-echarts
              </Typography.Link>
              ， api文档完全按照
              <Typography.Link
                href="https://echarts.apache.org/zh/index.html"
                target="blank"
              >
                echarts
              </Typography.Link>
              官方文档。
            </Typography.Paragraph>
            <Typography.Paragraph>
              4. 架构层面使用基于：
              <Typography.Link href="https://www.pnpm.cn/" target="_blank">
                pnpm（7.x）
              </Typography.Link>{" "}
              的 Monorepo 实践。 要求运行环境nodejs版本高于14。
            </Typography.Paragraph>
            <Divider dashed></Divider>
          </Typography>
          <Typography>
            <Instructions></Instructions>
          </Typography>
          <Typography>
            <Typography.Title level={3}>架构介绍</Typography.Title>
            <Filbel></Filbel>
          </Typography>
        </>
      );
    };
  },
});

type FilbelText = Array<{
  title: string;
  children?: FilbelText;
}>;
// 架构说明
const Filbel = defineComponent({
  setup() {
    const FilbelText: FilbelText = [
      {
        title: "Alien:外星人公用库",
        children: [
          {
            title:
              "compoents: 公用组件库、基于antd-vue 二次封装、vue-echarts封装组件",
          },
          {
            title:
              "hooks: 封装的公用的hooks方法，例如：获取本地缓存、切换true/false、切换标题...",
          },
          {
            title:
              "layout: 封装的后台管理管理框架的总容器，包含layout布局，左侧菜单内容，头部组件，插槽形式的右上角用户相关，菜单的收/开,自动打开、聚焦路由的导航...",
          },
          {
            title: "theme: 主题风格的less文件",
          },
          {
            title: "types: ts类型文件",
          },
          {
            title: "utils: 共用的工具方法",
          },
        ],
      },
      {
        title: "packages/*：项目库",
        children: [
          { title: "src/api: 全局的接口地址" },
          { title: "src/assets: 静态资源，图片、svg等" },
          {
            title:
              "src/components: 项目的布局容器baseLayout,基础配置,共用的组件",
          },
          { title: "src/router: 路由配置" },
          { title: "src/type: 类型文件" },
          { title: "src/views: 页面组件" },
        ],
      },
    ];
    return () => (
      <>
        <Stack justify={"start"} spacing={20}>
          <Image src={FiblieImg} width={280}></Image>
          <div
            class={css({
              fontSize: "16px",
              li: {
                marginTop: "10px !important",
              },
              ul: {
                paddingLeft: "10px !important",
                fontSize: 14,
              },
            })}
          >
            <ui>
              {FilbelText.map((item) => {
                return (
                  <li>
                    {item.title}
                    {item.children && item.children.length > 0 ? (
                      <ul>
                        {item.children.map((items) => {
                          return <li>{items.title}</li>;
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ui>
          </div>
        </Stack>
        <Divider dashed></Divider>
      </>
    );
  },
});
// 使用说明
const Instructions = defineComponent({
  setup() {
    const msg = [
      "1:进入系统根目录 <ALINEWEBAPP> pnpm install 安装全部项目的所有依赖",
      "2: 安装全部项目共有依赖 pnpm add xxxx -w",
      "3: 针对某个项目去安装 pnpm --filter(-F) <package_selector> <command>",
      "4: 公用内容与组件等：需要在Alien中创建，如过需要创建新的模块，需要在对应的文件夹下面创建package.json。特别注意其中的 name:@alien/xxxx",
      "5: 创建新的项目 正常创建流程，然后修改pageage中的name : @app/xxxx ",
      "6: 启动项目 ： pnpm start  然后选择你所要启动的项目。",
    ];
    return () => (
      <>
        <Typography.Title level={3}>使用说明</Typography.Title>
        {msg.map((item) => {
          return <Typography.Paragraph>{item}</Typography.Paragraph>;
        })}
        <Divider></Divider>
      </>
    );
  },
});

export default FilContaner;
