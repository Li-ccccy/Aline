import { envSelect } from "./controller/interactive.js";
import shell from "shelljs";

const init = async () => {
  const { packages, Env } = await envSelect();
  // 获取用户所选择的项目
  // 执行命令--- 启动项目----
  shell.exec(
    `cd packages/${packages} && pnpm run dev ${
      Env ? "--mode=" + Env : ""
    } --host`,
    {
      stdio: "inherit",
      shell: true,
      detached: false,
      env: {
        ...process.env,
        // 可以写自定义参数变量
      },
    }
  );
};

init();
