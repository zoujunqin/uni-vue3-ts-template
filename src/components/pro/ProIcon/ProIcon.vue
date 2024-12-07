<template>
  <uv-icon v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { uvEvents } from './uvEvents';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

defineOptions({ options: { virtualHost: true } });

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>
