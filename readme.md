### node
node >=16.14.x  </br>
pnpm >=8.x

### npm 包
安装包时请指定版本

### css
项目使用 scss + tailwind

### git
* git commit 遵守 Angular 提出的规范. [详情](./.commitlintrc.js)  </br>
eg: fix: xxxx
* git commit 之前会做 eslint + stylelint 校验及格式化.

### component
* uv-ui 使用 npm + easycom 方式自动注册组件，页面可以直接使用 kebab-case 的形式   </br>
eg: <uv-badge />
* 自定义组件放在 components 文件夹下都以 Pro 开头，且要符合 [easycom](./src/pages.json) 的方式,无需引入可直接使用  </br>
eg: <ProPage />

### unit
* 基准宽度为 750, 目前设计稿宽度为 375.内部已经做了转换，可直接用 px 单位，会自动转为 rpx, 若不想转为 rpx，使用大写px（PX）
* 直接写在 style 的 px 不会转换

### 图片和背景图
* 资源需要放在 http 上的写法：
* 图片引入写法：![img.png](docs/imgs/img-src-example.png)
* 背景图请使用 background-image 写在 style 中：![img.png](docs/imgs/bg-img-example.png)

* 不用 http，直接引用本地写法
* 不要用 import 和 @@static, 直接使用@/static/local, 一定要放在 local 文件夹下![img.png](img.png)
【
### 手机预览和调试
请关闭电脑的防火墙

[常见问题](./docs/FAQ.md)   

