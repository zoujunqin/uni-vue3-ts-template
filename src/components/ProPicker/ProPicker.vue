<template>
  <uv-picker ref="uvPickerRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { uvMethods } from './methods';
import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvPickerRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvPickerRef);
defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default { options: { name: 'ProPicker', virtualHost: true } };
</script>
