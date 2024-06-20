<template>
  <uv-notice-bar v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-notice-bar>
</template>

<script lang="ts" setup>
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default { options: { name: 'ProNoticeBar', virtualHost: true } };
</script>
