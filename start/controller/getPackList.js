import fs from "fs";
import path from "path";
// 自动获取packages下的项目名称
const url = path.resolve(process.cwd(), "packages");
const PackList = fs.readdirSync(url).filter((e) => e.indexOf(".") == -1);
export default PackList;
