- **node >=18.14.x**，**pnpm >=8.x**，安装依赖时指定版本保证依赖稳定
- pnpm dev 需要使用其他环境的配置,在命令后面添加 --mode **(test,staging,production)
- 手机调试关闭电脑防火墙，微信小程序需要打开调试
- [GIT 规范检查](./.commitlintrc.js)
- [eslint](./.eslintrc.js),[prettier](./.prettierrc.js),[stylelint](./.stylelintrc.js),
- [多多使用原子化css tailwind](./tailwind.config.js)
- [公共组件定义在 components/pro 可直接引用](./src/components/pro)
- [业务组件定义在 components/biz 可直接引用](./src/components/biz)
- [已按照750px的设计稿做了px的单位换算](./postcss.config.js), 大写的 PX 和行内样式的 px 不做换算
- [微信命令上传公众平台,需要添加 key 文件](./mp-weixin.private.key),[并且修改 privateKeyPath](./scripts/mp-weixin-upload.js)
- [内置了h5中转页的多页面配置,可以和本项目共享构建时的环境变量](./vite.transith5.config.js)
- [dev 下不使用异步分包的优化,只在 build 时才会优化分包,如果出现分包页面组件闪动或不生效,极大可能是异步分包组件占位问题(无解，除非将组件打入主包)](./build/packages/vite-plugin-uni/index.ts)
- [重写了 uni 的导航方法，如果用户没有登录，则重定向到登录页](./src/uni/rewiteUniFunction.ts)
- [可以使用布局组件，ProPage、ProLayout、ProHeader、ProContent、ProFooter](./docs/layout.md)
- [需要一起打包的图片放在 static 文件夹下](./src/static), [需要放到服务器的图片放在 static@http 文件夹下](../src/static@http)，生产环境只需要将图片扔到生产环境服务器
```vue
<template>
  import { getAssetsResource } from '@/utils/index.ts'
  <!-- 模板中使用 -->
  <image :src="getAssetsResource('@http/person/xxx.png')"></image>
</template>

<style scoped lang="scss">
/* scss 中使用 */
page {
  background-image: url($http + '/person/xxx.png');
}
</style>
```

- [异步分包组件问题](./docs/build.md)
- [目录说明](./docs/dir.txt)
- [常见问题](./docs/FAQ.md)
- [骨架屏使用](./docs/skeleton.md)

- <font color=red>tip1: 小程序 dev 时关闭了域名检查保证前后端对接通畅，生产环境需注意第三方域名校验问题</font>
- <font color=red>tip2: 小程序插件有可能与第三方库产生冲突，排查困难</font>
