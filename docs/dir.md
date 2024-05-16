|-- root
    |-- tsconfig.json
    |-- vite.config.js
    |-- build
    |   |-- config.ts                      // 构建配置
    |   |-- packages                       // uni 插件
    |       |-- uni-cli-shared             // 插件公共工具
    |       |-- uni-mp-vite                // 小程序 vite 插件
    |       |-- uni-mp-weixin              // 微信小程序相关配置
    |       |-- vite-plugin-uni            // 插件入口
    |-- docs                               // 说明文档
    |-- h5                                 // 放置 h5 页面, h5 中转页
    |-- scripts                            // 脚本文件
    |-- src
    |   |-- App.vue
    |   |-- main.ts
    |   |-- manifest.json
    |   |-- pages.json
    |   |-- sceneCode.ts                   // 自定义场景值
    |   |-- sceneWeChat.ts                 // 微信场景值
    |   |-- api                            // 后端接口
    |   |-- components                    
    |   |   |-- Pro                        // 基础组件
    |   |   |-- business                   // 业务组件
    |   |-- constant                       // 常量
    |   |-- framework                      // uni 框架相关
    |   |-- hooks
    |   |-- mixins
    |   |-- pages                          // 主包页面
    |   |-- pagesAuth                      // 分包
    |   |-- pagesPerson                    // 分包
    |   |-- pagesTask                      // 分包
    |   |-- pinia                          // 状态管理
    |   |-- static                         // 静态资源
    |   |-- static@http                    // 本地服务的静态资源
    |   |-- style
    |   |-- utils
