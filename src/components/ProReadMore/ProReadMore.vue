<template>
  <uv-read-more ref="uvReadMoreRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-read-more>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { uvEvents } from './events';
import { uvMethods } from './methods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvReadMoreRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvReadMoreRef);

defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
