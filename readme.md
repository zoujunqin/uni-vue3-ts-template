- **node >=18.14.x**，**pnpm >=8.x**，安装依赖时指定版本保证依赖稳定
- [GIT 规范检查](../.commitlintrc.js)
- [多多使用原子化css tailwind](../tailwind.config.js)
- [组件定义在 components 可直接引用](../src/components)
- [已按照750px的设计稿做了px的单位换算](../postcss.config.js), 大写的 PX 和行内样式的 px 不做换算
- [需要一起打包的图片放在 static 文件夹下](../src/static), [需要放到服务器的图片放在 static@http 文件夹下](../src/static@http)，生产环境只需要将图片扔到生产环境服务器

```vue
<template>
  <!-- 模板中使用 -->
  <image :src="import('@http/person/xxx.png')"></image>
</template>

<style scoped lang="scss">
/* scss 中使用 */
page {
  background-image: url($http + '/person/xxx.png');
}
</style>
```

- 手机调试关闭电脑防火墙，微信小程序需要打开调试
- [其他文档](./docs)