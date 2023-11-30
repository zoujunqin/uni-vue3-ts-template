- uni 内置组件不支持 v-bind，自定义组件可以
- 自定义组件需要合并虚拟节点的要添加以下代码
  ```js
  <script lang="ts">
  export default {
    options: {
        virtualHost: true
    }
  };
  </script>
  ```
- swiper 和 tab 的 current 属性不要用同一个变量，内部机制问题