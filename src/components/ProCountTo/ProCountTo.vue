<template>
  <uv-count-to ref="uvCountToRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvCountToRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvCountToRef);

defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default { options: { name: 'ProCountTo', virtualHost: true } };
</script>
