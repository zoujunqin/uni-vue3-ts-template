<template>
  <uv-pick-color
    ref="uvPickColorRef"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvPickColorRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvPickColorRef);
defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default {
  options: { name: 'ProPickColor', virtualHost: true }
};
</script>
