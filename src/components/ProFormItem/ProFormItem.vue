<template>
  <uv-form-item ref="parentInstance" v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-slot:[labelSlot]>
      <slot name="label" />
    </template>

    <slot />

    <template v-slot:[rightSlot]>
      <slot name="right" />
    </template>

    <template v-slot:[errorSlot]>
      <slot name="error" />
    </template>
  </uv-form-item>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import { useBridgedEmits } from '../../hooks/useBridgedEmits';
import { useNextedCompatible } from '../../hooks/useNextedCompatible';

import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);
const { parentInstance } = useNextedCompatible();

const labelSlot = computed(() => (useSlots()?.label ? 'label' : ''));
const rightSlot = computed(() => (useSlots()?.right ? 'right' : ''));
const errorSlot = computed(() => (useSlots()?.error ? 'error' : ''));
</script>

<script lang="ts">
export default {
  // 这里 name 为 uv-form-item 是为了 uv-input 以及其他的表单组件内部的查找机制
  name: 'uv-form-item',
  nameFake: true,
  options: { name: 'ProFormItem', virtualHost: true }
};
</script>
