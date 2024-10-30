<template>
  <uv-tabbar
    ref="uvInstance"
    :border="false"
    :value="value"
    :fixed="false"
    :placeholder="false"
    class="!hx-flex-none"
    v-bind="$attrs"
    @change="tabbarChange"
  >
    <slot />
  </uv-tabbar>
</template>

<script lang="ts" setup>
/*
 * 问题: uv-tabbar-item 一级一级向上查找数据, 因为插槽, 所以查找不到 uv-tabbar, 就无法构建上下级数据更新
 * 修复: 将 pro-tabbar 仿冒为 uv-tabbar, 复制 uv-tabbar 的数据到当前组件供子组件初始化, 然后去更新子组件的 parent 为 uv-tabbar
 * */

import { useFakerRef } from '@/hooks/useFakerRef';
import { useNextedCompatible } from '@/hooks/useNextedCompatible';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps({
  modelValue: String
});
const emit = defineEmits(['update:modelValue', 'change']);

const { instance: uvInstance } = useFakerRef();
const { ctx } = useNextedCompatible(uvInstance);

const value = useVModel(props, 'modelValue', emit);

const tabbarChange = name => {
  value.value = name;
  ctx.value = name;
  emit('change', name);
};
</script>

<script lang="ts">
export default {
  // 这里 name 为 uv-tabbar 是为了 uv-tabbar-item 内部的查找机制
  name: 'uv-tabbar',
  options: { name: 'ProTabbar', virtualHost: true }
};
</script>
