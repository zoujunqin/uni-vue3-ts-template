<template>
  <uv-tabbar
    ref="uvTabbarRef"
    :border="false"
    :value="value"
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

import { getCurrentInstance, onMounted, ref } from 'vue';

import { useVModel } from '@/hooks/useVModel';

const props = defineProps({
  modelValue: String
});
const emit = defineEmits(['update:modelValue', 'change']);

const value = useVModel(props, 'modelValue', emit);
const uvTabbarRef = ref();

const { ctx } = getCurrentInstance();
ctx.children = [];
// 这里 name 为 uv-tabbar 是为了 uv-tabbar-item 内部的查找机制
ctx.$options = Object.assign(ctx.$options || {}, { name: 'uv-tabbar' });

const tabbarChange = name => {
  value.value = name;
  ctx.value = name;
  emit('change', name);
};

// 更新 uv-tabbar-item 的 parent 为 uv-tabbar, 保证执行原有逻辑
function updateUvTabbarParent() {
  uvTabbarRef.value.children = ctx.children.map(child => {
    return Object.assign(child, { parent: uvTabbarRef.value });
  });
}

onMounted(() => {
  // 将 uv-tabbar 的数据暂时绑定到 pro-tabbar, uv-tabbar-item 就能获取到 uv-tabbar 的数据
  const { $props, $data } = uvTabbarRef.value;
  const mergedData = { ...$props, ...$data };
  for (const key in mergedData) {
    ctx[key] = mergedData[key];
  }

  // 重写 updateParentData 方法, 不然没次执行都会变更 child 的 parent 导致错误
  ctx.children.forEach(child => {
    const originUpdateParentData = child.updateParentData;
    child.updateParentData = function () {
      originUpdateParentData();
      updateUvTabbarParent();
    };
    // 重新初始化数据
    child.init();
  });
});
</script>

<script lang="ts">
export default {
  options: { name: 'ProTabbar', virtualHost: true }
};
</script>
