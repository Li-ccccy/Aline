# 开发必读 :flying_saucer:

::: tip 重要提示 :rainbow:
请仔细阅读本页内容，将有效帮助你了解 ET 前端项目的架构。
:::

## 背景

为了统一公司所有前端项目的输出口，规范前端代码编写，减少不必要的组件重复开发。特选择 pnpm 做为底座，将项目进行 Monorepo 管理。

## 开发思想

::: warning :rainbow:
做为 Monorepo 架构的设计，大家必须有一个思想就是 `一切皆模块`。 这也是脱离初级程序猿的必经之路，项目里各种 `import , export` 做到`高聚合与低耦合`。一个组件拆分能力也是考验自己的能力体现。

在这里，其实没有所谓的项目，只有所谓的模块（页面，组件）。`一切皆组件`一个项目的落地，无非是前端无数个组件拼接而成，自上而下的。 A 项目 引用 B 项目的 组件是常见的事儿。

所以在这里，除非使用了 @alien 内的组件或工具，本项目使用到的工具或者引用，不建议使用 @ 快捷符 改为 '../../../' 类型
:::

## 目录结构

这里罗列了 ET 架构中的目录结构，在项目开发中，请遵照这个目录结构组织代码。

```
.
├── .husky
├── .vscode
├── Alien
│   ├── compoents （各种分装好的组件）
│   ├── hooks     （各种hooks方式）
│   ├── layout    （布局组件）
│   ├── public    （静态文件）
│   ├── theme     （里面是修改antd,或者第三方的css）
│   ├── types     （一些公用的ts类型）
│   ├── utils     （很多工具函数）
│   ├── end.d.ts
│   ├── tsconfig.json
│   └── vite-env.d.ts
├── packages （存放项目的位置）
│   ├── xxxxx (项目)
│   └── yyyyy (项目)
├── start
│   ├── controller
│   │   ├── getPackList.js
│   │   └── interactive.js
│   ├── build.js
│   └── index.js
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── commitlint.config.js
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml README.md
└── README.md
```

## Packages

:truck: 这个架构使用了 pnpm 的 Monorepo 项目管理，于是将所有的项目放到 `packages` 目录下，在你使用 `pnpmstart`时，会自动读取你所有的项目，供你选择。

## 关于 Pnpm 使用





> 详细内容请学习 [pnpm](https://www.pnpm.cn/) 相关知识

1: 安装 pnpm install 安装全部项目的所有依赖

2: 安装全部项目共有依赖 pnpm add xxxx -w

3: 针对某个项目去安装 pnpm --filter(-F) `<package_selector> <command>`

4：卸载依赖 pnpm remove -F xxxx / pnpm remove xxxx -w

5: 公用内容与组件等：需要在 Alien 中创建，如过需要创建新的模块，需要在对应的文件夹下面创建 package.json。`特别注意其中的 name:@alien/xxxx`，如果是packages中项目的话，package.json `name: @app/xxx`

6：内部自己引用 当前项目中的 package.json 内 dependencies 下 新增 "@alien/components（这里的名称与对应的 package 中的 name 字段相同）": "workspace:\*" 。 然后运行 pnpm -F xxx install

## 环境变量

:fountain: 如果你的项目中有不同的.env 文件，在你选择好项目后，会让你选择你要使用的 env 文件,并读取里面的变量。

:shinto_shrine: 你的 .env 文件可以有多个，每个文件对应没个环境。通常会有`.env.development`、`.env.production` 两个文件。

:train2: 如果有公用的变量，可以新建一个 `.env`文件，这个文件内的环境变量级别是最低的，在任何环境下都会加载，如果有在.env.xxxx 下有相同的，取 xxx 内的变量值。

:barber: 注意所有的变量都按照 `VITE_APP_XXXX=yyyy` 格式使用。

:champagne: 在项目中使用如下：

```js
const Demo = import.meta.env.xxxx;
```
