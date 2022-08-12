import interactive from "./controller/interactive.js";
import shell from "shelljs";

const init = async () => {
  // 获取用户所选择的项目
  let { packages } = await interactive;
  // 执行命令--- 启动项目
  shell.exec(`cd packages/${packages} && pnpm run build`, {
    stdio: "inherit",
    shell: true,
    detached: false,
    env: {
      ...process.env,
      // 可以写自定义参数变量,在vite.config.js可通过process.env.xxx 获取变量
    },
  });
};

init();
