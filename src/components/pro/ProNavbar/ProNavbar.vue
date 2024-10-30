<template>
  <uv-navbar bg-color="transparent" v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-slot:[leftSlot]>
      <slot name="left" />
    </template>

    <template v-slot:[centerSlot]>
      <slot name="center" />
    </template>

    <template v-slot:[rightSlot]>
      <slot name="right" />
    </template>
  </uv-navbar>
</template>
<script lang="ts" setup>
import { computed, useSlots } from 'vue';

import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const leftSlot = computed(() => (useSlots()?.left ? 'left' : ''));
const centerSlot = computed(() => (useSlots()?.center ? 'center' : ''));
const rightSlot = computed(() => (useSlots()?.right ? 'right' : ''));
</script>

<script lang="ts">
export default { options: { name: 'ProNavbar', virtualHost: true } };
</script>
