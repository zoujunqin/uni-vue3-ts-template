<template>
  <uv-line-progress v-bind="$attrs">
    <template v-slot:[defaultSlot]>
      <slot />
    </template>
  </uv-line-progress>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

defineOptions({ options: { name: 'ProLineProgress', virtualHost: true } });
const defaultSlot = computed(() => (useSlots().default ? 'default' : ''));
</script>
