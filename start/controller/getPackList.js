import fs from "fs";
import path from "path";
// 自动获取packages下的项目名称
const url = path.resolve(process.cwd(), "packages");
const PackList = fs.readdirSync(url).filter((e) => e.indexOf(".") == -1);
export default PackList;

// 获取环境变量文件
export const getEnvList = (pwc) => {
  const url = path.resolve(process.cwd(), `packages/${pwc}`);
  console.log(url);
  const EnvList = fs.readdirSync(url).filter((e) => e.indexOf(".env") == 0);
  return EnvList.map((e) => {
    return e.replace(".env.", "");
  });
};
