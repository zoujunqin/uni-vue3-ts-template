### node

node >=16.14.x </br>
pnpm >=8.x

### npm 包

安装包时请指定版本

### css

项目使用 scss + tailwind

### git

- git commit 遵守 Angular 提出的规范. [详情](./.commitlintrc.js) </br>
  eg: fix: xxxx
- git commit 之前会做 eslint + stylelint 校验及格式化.

### component

- uv-ui 使用 npm + easycom 方式自动注册组件，页面可以直接使用 kebab-case 的形式 </br>
  eg: <uv-badge />
- 自定义组件放在 components 文件夹下都以 Pro 开头，且要符合 [easycom](./src/pages.json) 的方式,无需引入可直接使用 </br>
  eg: <ProPage />

### unit

- 基准宽度为 750, 目前设计稿宽度为 375.内部已经做了转换，可直接用 px 单位，会自动转为 rpx, 若不想转为 rpx，使用大写px（PX）
- 直接写在 style 的 px 不会转换, 需要自己转 rpx

### 图片和背景图

- 使用 http 图片：

```vue
// @http 指向 static 文件夹
<image :src="import('@http/person/xxx.png')" ></image>
```

- 使用 http 背景图：

```vue
<view :style="`background-image: ${import('@http/person/xxx.png')}`"></view>
```

```scss
// $http 会自动注入
page {
  background-image: url($http + '/person/xxx.png');
}
```

- 使用本地图片<br>
  **_<text style="color: red;">tip: 一定要放在 static/local 文件夹下，其他文件夹在生产环境会被删除</text>_**

### 手机预览和调试

请关闭电脑的防火墙

[常见问题](./docs/FAQ.md)
