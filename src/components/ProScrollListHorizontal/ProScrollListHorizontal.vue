<template>
  <uv-scroll-list v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-scroll-list>
</template>

<script lang="ts" setup>
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProScrollListHorizontal', virtualHost: true }
};
</script>
