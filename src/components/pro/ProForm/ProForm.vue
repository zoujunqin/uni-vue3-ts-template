<template>
  <uv-form ref="uvInstance" v-bind="$attrs">
    <slot />
  </uv-form>
</template>

<script lang="ts" setup>
/*
 * 问题: uv-form-item 一级一级向上查找数据, 因为插槽, 所以查找不到 uv-form, 就无法构建上下级数据更新
 * 修复: 将 pro-form 仿冒为 uv-form, 复制 uv-form 的数据到当前组件供子组件初始化, 然后去更新子组件的 parent 为 uv-form
 * */

import { uvMethods } from './methods';

import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';
import { useNextedCompatible } from '@/hooks/useNextedCompatible';

const { instance: uvInstance } = useFakerRef();

/* #ifdef MP-WEIXIN */
useNextedCompatible(uvInstance);
/* #endif */

const { bridgedMethods } = useBridgedMethods(uvMethods, uvInstance);

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default {
  /* #ifdef MP-WEIXIN */
  // 这里 name 为 uv-form 是为了 uv-form-item 内部的查找机制
  name: 'uv-form',
  /* #endif */
  options: { name: 'ProForm', virtualHost: true }
};
</script>
