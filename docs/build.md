### 打包说明
1. 目前只做微信小程序的打包优化，其他平台还未做适配
2. 微信小程序主包用到的组件会直接打包到主包，如果只有分包用到的组件会打包到异步分包 **_pagesCommon** 中
3. 如果有些组件不想被打包到异步分包中，可以在 **App.vue** 中添加以下代码

    ```vue
    <template>
        <ProSkeleton />
        <ProSkeletonCircle />
        <ProSkeletonRect />
    </template>
   
    <script setup lang="ts">
      /* 不想被打入异步分包的组件 */
      import ProSkeleton from '@/components/pro/ProSkeleton/ProSkeleton.vue';
      import ProSkeletonCircle from '@/components/pro/ProSkeletonCircle/ProSkeletonCircle.vue';
      import ProSkeletonRect from '@/components/pro/ProSkeletonRect/ProSkeletonRect.vue';
    </script>
    ```

4. 微信小程序使用两个微信公众账号，生产环境单独一个账号，开发和体验用一个账号
