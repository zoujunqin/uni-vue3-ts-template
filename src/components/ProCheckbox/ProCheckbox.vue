<template>
  <uv-checkbox v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-if="$slots.icon">
      <slot name="icon"></slot>
    </template>

    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </uv-checkbox>
</template>

<script lang="ts" setup>
import { useBridgedEmits } from '../../hooks/useBridgedEmits';
import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProCheckbox', virtualHost: true }
};
</script>
