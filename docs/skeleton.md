### 使用方法

```vue
...
<template>
  <ProSkeleton :loading="loading" animate>
    <!--  ProSkeletonRect 不会影响到布局  -->
    <ProSkeletonRect width="100px" height="20px" margin-bottom="10pxx">
      ...
    </ProSkeletonRect>
    <ProSkeletonCircle> ... </ProSkeletonCircle>
  </ProSkeleton>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

const loading = shallowRef;
</script>
...
```
