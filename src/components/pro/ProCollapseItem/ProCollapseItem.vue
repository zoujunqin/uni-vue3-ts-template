<template>
  <uv-collapse-item ref="uvCollapseItemRef" v-bind="$attrs">
    <slot />

    <template v-slot:[titleSlot]>
      <slot name="title" />
    </template>

    <template v-slot:[iconSlot]>
      <slot name="icon" />
    </template>

    <template v-slot:[valueSlot]>
      <slot name="value" />
    </template>

    <template v-slot:[rightIconSlot]>
      <slot name="right-icon" />
    </template>
  </uv-collapse-item>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

import { useFakerRef } from '@/hooks/useFakerRef';

const titleSlot = computed(() => (useSlots()?.title ? 'title' : ''));
const iconSlot = computed(() => (useSlots()?.icon ? 'icon' : ''));
const valueSlot = computed(() => (useSlots()?.value ? 'value' : ''));
const rightIconSlot = computed(() =>
  useSlots()?.['right-icon'] ? 'right-icon' : ''
);

const { instance: uvCollapseItemRef } = useFakerRef();
</script>

<script lang="ts">
export default {
  options: { name: 'ProCollapseItem', virtualHost: true }
};
</script>
