- uni 内置组件不支持 v-bind，自定义组件可以
- 自定义组件需要合并虚拟节点的要添加以下代码
  ```js
  export default { options: { virtualHost: true } };
  ```
- swiper 和 tab 的 current 属性不要用同一个变量，内部机制问题
- 自定义组件上 click 不生效，需要组件内部 emit 一个 click 事件
- onMounted 周期函数中使用 nextTick 反而获取不到 ref