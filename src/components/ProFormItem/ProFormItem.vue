<template>
  <uv-form-item v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-if="$slots.label">
      <slot name="label"></slot>
    </template>

    <template v-if="$slots.default">
      <slot></slot>
    </template>

    <template v-if="$slots.right">
      <slot name="right"></slot>
    </template>

    <template v-if="$slots.error">
      <slot name="error"></slot>
    </template>
  </uv-form-item>
</template>

<script lang="ts" setup>
import { uvEvents } from './events';
import { useBridgedEmits } from '../../hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProFormItem', virtualHost: true }
};
</script>
