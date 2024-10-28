<template>
  <uv-steps ref="uvInstance" v-bind="$attrs">
    <slot />
  </uv-steps>
</template>

<script lang="ts" setup>
/*
 * 问题: uv-steps-item 一级一级向上查找数据, 因为插槽, 所以查找不到 uv-steps, 就无法构建上下级数据更新
 * 修复: 将 pro-steps 仿冒为 uv-steps, 复制 uv-steps 的数据到当前组件供子组件初始化, 然后去更新子组件的 parent 为 uv-steps
 * */

import { useFakerRef } from '@/hooks/useFakerRef';
import { useNextedCompatible } from '@/hooks/useNextedCompatible';

const { instance: uvInstance } = useFakerRef();
useNextedCompatible(uvInstance);
</script>

<script lang="ts">
export default {
  // 这里 name 为 uv-steps 是为了 uv-steps-item 内部的查找机制
  name: 'uv-steps',
  options: { name: 'ProSteps', virtualHost: true }
};
</script>
