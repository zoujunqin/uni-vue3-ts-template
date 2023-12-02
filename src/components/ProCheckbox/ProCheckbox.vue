<template>
  <uv-checkbox v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />

    <template #icon>
      <slot name="icon" />
    </template>
  </uv-checkbox>
</template>

<script setup lang="ts">
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
