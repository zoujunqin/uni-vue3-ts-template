<template>
  <uv-number-box v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-slot:[minusSlot]>
      <slot name="minus" />
    </template>

    <template v-slot:[inputSlot]>
      <slot name="input" />
    </template>

    <template v-slot:[plusSlot]>
      <slot name="plus" />
    </template>
  </uv-number-box>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import { uvEvents } from './events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const minusSlot = computed(() => (useSlots()?.minus ? 'minus' : ''));
const inputSlot = computed(() => (useSlots()?.input ? 'input' : ''));
const plusSlot = computed(() => (useSlots()?.plus ? 'plus' : ''));
</script>

<script lang="ts">
export default {
  options: { name: 'ProNumberBox', virtualHost: true }
};
</script>
