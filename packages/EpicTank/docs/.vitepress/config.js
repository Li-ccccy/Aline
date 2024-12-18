const sidebar = require("./Sidebar");
module.exports = {
  // 网站标题
  title: "ET-PicTank",
  // 网站描述
  description: "一个小小的框架库",
  // 打包目录
  dest: "./dist",
  base: "/",
  // 头部head
  head: [
    // 添加图标
    [
      "link",
      {
        rel: "icon",
        href: "//img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg",
      },
    ],
  ],
  // 主题配置
  themeConfig: {
    // 启动页面丝滑滚动
    smoothScroll: true,
    // 导航栏配置
    nav: [
      { text: "指南", link: "/docs/tutorials/started" },
      { text: "组件", link: "/docs/tutorials/blog" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Li-ccccy" }],
    sidebar,
  },
};
