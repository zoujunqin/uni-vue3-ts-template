<template>
  <uv-row v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-row>
</template>

<script setup lang="ts">
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProRow', virtualHost: true }
};
</script>
