<template>
  <uv-col v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-col>
</template>

<script setup lang="ts">
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProCol', virtualHost: true }
};
</script>
