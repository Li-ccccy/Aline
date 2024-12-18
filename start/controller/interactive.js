import inquirer from "inquirer";
import PackList, { getEnvList } from "./getPackList.js";

const promptList = [
  {
    type: "list",
    message: "请选择项目:",
    name: "packages",
    choices: PackList,
  },
];

export const envSelect = () => {
  return new Promise((resolve, reject) => {
    inquirer.prompt(promptList).then(({ packages }) => {
      let List = getEnvList(packages);
      if (List && List.length > 0) {
        const EnvList = [
          {
            type: "list",
            message: "请选择环境变量文件:",
            name: "Env",
            choices: List,
          },
        ];
        inquirer.prompt(EnvList).then(({ Env }) => {
          resolve({ packages, Env });
        });
      } else {
        resolve({
          packages,
          Env: null,
        });
      }
    });
  });
};

export default () => {
  return new Promise((resolve, reject) => {
    inquirer.prompt(promptList).then(({ packages }) => {
      resolve({ packages });
    });
  });
};
