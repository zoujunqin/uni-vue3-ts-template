### 打包说明
1. 目前只做微信小程序的打包优化，其他平台还未做适配
2. 微信小程序主包用到的组件会直接打包到主包，如果只有分包用到的组件会打包到异步分包 **_pagesCommon** 中
3. 如果有些组件不想被打包到异步分包中，可以在 **App.vue** 的 **onMounted** 中添加以下代码

```vue
<script setup lang="ts">
  import {onMounted} from "vue";

  onMounted(() => {
    /* 不想被打入异步分包的组件 */
    import('@/components/ProSkeleton/ProSkeleton.vue');
    import('@/components/ProSkeletonRect/ProSkeletonRect.vue');
    import('@/components/ProSkeletonCircle/ProSkeletonCircle.vue');
  });
</script>
```