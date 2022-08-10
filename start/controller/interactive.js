import inquirer from "inquirer";
import PackList from "./getPackList.js";
const promptList = [
  {
    type: "list",
    message: "请选择您要启动的项目:",
    name: "packages",
    choices: PackList,
  },
];
export default inquirer.prompt(promptList);
