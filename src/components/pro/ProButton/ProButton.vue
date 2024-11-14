<template>
  <uv-button
    class="pro-button"
    throttle-time="500"
    custom-style="border-radius: 6px; height: 40px;"
    custom-text-style="font-size: var(--font-size-regular)"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  >
    <slot />
  </uv-button>
</template>

<script lang="ts" setup>
import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default { options: { name: 'ProButton', virtualHost: true } };
</script>
