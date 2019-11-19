
> 前端网站脚手架

## 支持

- 配置：统一明确的配置文件（支持开发和生产模式，多部署环境）
- 构建：webpack4 (多html，分包，dev server，热加载)
- 样式：less
- 项目配置：react + react-router-dom + reflux + fetch。
- 国际化：i18n + [i18n-service](https://github.com/ccqgithub/i18n-service)

## 使用前必读1：依赖环境

- node@8.x (support: async, await, es class等……)

## 使用前必读2：环境变量

- `process.env.NODE_ENV`: 主要配置 `本地开发调试` 和 `发布` 的区别，development, production.
- `process.env.APP_ENV`: 配置不同发布环境：dev, test, prod 等...

## 使用前必读3：路径的引用

- 为了组件和单元测试中路径的统一，请在开发中使用别名`@`

## 开始开发：

- `git clone git@github.com:WeConnect/china-spacestation.git
- `npm install`
- `npm run dev` 

## 配置

配置文件放在`config`目录下：

- `project.conf.js`: 项目的常规配置，不分环境。
- `define.conf.js`: 配置项目中的常量[DefinePlugin]

## reflux使用
- action.js中定义一个变量，store.js中监听
- action: loginUser
- store: onLoginUser

- 使用：引入action.js和store.js
- 更新数据：action.loginUser('传入的值')
- 读取数据：store.XXX (XXX为store中定义的变量)

## 路由跳转
- import { withRouter } from 'react-router-dom';
- withRouter(组件)
- 使用：this.props.history.push(页面)

## icon
- react-ionicons:
- https://zamarrowski.github.io/react-ionicons/

## 单元测试（jest + enzyme）

- 文件名.test.jsx
- `npm test` or `npm test (page path)`
- 如果有引用的全局变量报错，可以在package.json/jest/globals中设置

- [配置及使用参考]
-  https://airbnb.io/enzyme/

- mock fetch方法：（有返回值）
- 例： 模拟feeds.js文件中getList函数请求接口后返回数据
```
jest.mock('@/fetch/feeds', () => ({
  getList: () => {
    const feedsList = require('tests/response/feeds')
    return {data: feedsList}
  },
}))
```

## 国际化语言
- 翻译在后台管理中录入，不能直接修改本地文件
- http://i18n.nakedhub.com/
- 每次录入语言后，本地执行`npm run i18n`下载文件

## 组件使用
- 组件的使用请参考`组件.test.jsx`文件

## 目录
```
---- app: 
  |---- components: 公共组件
  |---- containers: 页面
  |---- entry: 入口js
  |---- fetch: 定义所有的请求接口
  |---- reflux: 数据存储（用户信息等）
     |---- loginUser: 登陆用户
     |---- languages: 语言
     |---- pathname: 当前页面path
     |---- cities: 城市列表
     |---- locations: 社区列表
  |---- router: 页面路由
  |---- static: 
     |---- images: 图片（组件中引用图片：require('相对路径')）
     |---- style: css
     |---- utils: 自定义函数
     |---- template: html模板
     |
---- build: 构建脚步
  |
---- config: 配置文件
  |---- project.conf.js: 项目的常规配置，不分环境
  |---- define.conf.js:  配置项目中的常量
  |---- public.conf.js: 构建输出配置
  |
---- script: 存放项目需要的相关脚本文件
  |---- i18n-download.js 从`i18n-service`下载翻译文件
  |
---- root: 不需要编译，直接输出到根目录的文件

```

