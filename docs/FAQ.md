- Q: v-bind 不生效 <br/>
  A: uni 内置组件不支持 v-bind，自定义组件可以

- Q: 组件默认会包一层 view 标签 <br/>
  A: 
  ```ts
  // 自定义组件合并虚拟节点
  export default { options: { virtualHost: true } };
  ```

- Q: swiper 和 tab 的 current 属性是同一个变量导致的问题 <br/>
  A: 内部机制问题, 不要用同一个变量

- Q: 组件上绑定 click 事件不生效 <br/>
  A: 自定义组件需要手动实现 emit click 事件

- Q: onMounted 周期函数中使用 nextTick 反而获取不到 ref <br/>

- Q: uniapp 微信小程序 ``` template ``` 上用 ``` v-if="$slots.default" ``` 判断是否有插槽无效 <br/>
  A: 使用动态插槽的方式 
  ```ts
  // 无效
  <template v-if="$slots.default" #default>
    <slot name="default" />
  </template>

  // 有效
  <slot v-slot:[defaultSlot]/>
  <script>
    ...
    const defaultSlot = computed(() => useSlots().default ? 'default' : '')
  </script>
  ```