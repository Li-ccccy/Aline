## 项目使用说明 :

#### 1: 安装 pnpm install 安装全部项目的所有依赖

#### 2: 安装全部项目共有依赖 pnpm add xxxx -w

#### 3: 针对某个项目去安装 pnpm --filter(-F) <package_selector> <command>

#### 4: 公用内容与组件等：需要在Alien中创建，如过需要创建新的模块，需要在对应的文件夹下面创建package.json。特别注意其中的 name:@alien/xxxx 

#### 5：内部自己引用 当前项目中的package.json 内 dependencies 下 新增 "@alien/components（这里的名称与对应的package中的name字段相同）": "workspace:*" 。 然后运行pnpm -F  xxx install 

#### 6: 创建新的项目 正常创建流程，然后修改pageage中的name : @app/xxxx 
