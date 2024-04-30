<template>
  <uv-form-item ref="parentInstance" v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-if="$slots.label">
      <slot name="label" />
    </template>

    <template v-if="$slots.default">
      <slot />
    </template>

    <template v-if="$slots.right">
      <slot name="right" />
    </template>

    <template v-if="$slots.error">
      <slot name="error" />
    </template>
  </uv-form-item>
</template>

<script lang="ts" setup>
import { useBridgedEmits } from '../../hooks/useBridgedEmits';
import { useNextedCompatible } from '../../hooks/useNextedCompatible';

import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);
const { parentInstance } = useNextedCompatible();
</script>

<script lang="ts">
export default {
  // 这里 name 为 uv-form-item 是为了 uv-input 以及其他的表单组件内部的查找机制
  name: 'uv-form-item',
  options: { name: 'ProFormItem', virtualHost: true }
};
</script>
