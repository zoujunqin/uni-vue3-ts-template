<template>
  <uv-read-more ref="uvReadMoreRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-read-more>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvReadMoreRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvReadMoreRef);

defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default { options: { name: 'ProReadMore', virtualHost: true } };
</script>
