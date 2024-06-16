<template>
  <uv-switch v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default {
  options: { name: 'ProSwitch', virtualHost: true }
};
</script>
