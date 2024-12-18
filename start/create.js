import { copyDir } from "./utils/copyDir.js";
import path from "path";

// 将模版项目复制出来到指定项目。
const TargetPath = path.resolve(process.cwd(), `Template`);
const ToPath = path.resolve(process.cwd(), `packages/${process.argv[2]}`);
copyDir(TargetPath, ToPath, (info) => {
  console.log(info, "info");
});
