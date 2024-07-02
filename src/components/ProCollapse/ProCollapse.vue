<template>
  <uv-collapse ref="uvInstance" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-collapse>
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';
import { useNextedCompatible } from '@/hooks/useNextedCompatible';

const { instance: uvInstance } = useFakerRef();
useNextedCompatible(uvInstance);
const { bridgedEvents } = useBridgedEmits(uvEvents);
const { bridgedMethods } = useBridgedMethods(uvMethods, uvInstance);

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default {
  // 这里 name 为 uv-collapse 是为了 uv-collapse-item 内部的查找机制
  name: 'uv-collapse',
  options: { name: 'ProCollapse', virtualHost: true }
};
</script>
