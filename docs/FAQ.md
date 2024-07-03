- Q: v-bind 不生效 <br/>
  A: uni 内置组件不支持 v-bind，自定义组件可以 <br/><br/>

- Q: 组件默认会包一层 view 标签 <br/>
  A:

  ```ts
  // 自定义组件合并虚拟节点
  export default { options: { virtualHost: true } };
  ```

- Q: swiper 和 tab 的 current 属性是同一个变量导致的问题 <br/>
  A: 内部机制问题, 不要用同一个变量 <br/><br/>

- Q: 组件上绑定 click 事件不生效 <br/>
  A: 自定义组件需要手动实现 emit click 事件<br/><br/>

- Q: onMounted 周期函数中使用 nextTick 反而获取不到 ref <br/><br/>

- Q: uniapp 微信小程序 `template` 上用 `v-if="$slots.default"` 判断是否有插槽无效 <br/>
  A: 使用动态插槽的方式

  ```vue
  // 无效
  <template v-if="$slots.default" #default>
    <slot name="default" />
  </template>

  // 有效
  <template>
    <slot v-slot:[defaultSlot] />
  </template>
  
  <script>
  ...
  const defaultSlot = computed(() => useSlots().default ? 'default' : '')
  </script>
  ```

- Q: 小程序开发环境通过 ref 可以正常的获取组件的实例，生产环境报错 <br/>
  A: 项目打包使用了异步分包优化的方式来减少小程序主包的体积，由于异步分包组件有延迟性，所以在初次渲染是用 view 标签替代等待加载完毕后在替换成组件，但是 ref 不是响应式导致报错。

  ```vue
  <template>
    <ProDateTimePicker v-model:refer="proDateTimeRef" />
  </template>

  <script>
  import {shallowRef} from "vue";
  ...
  const proDateTimeRef = shallowRef()
  </script>
  ```
