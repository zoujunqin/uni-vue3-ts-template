<template>
  <uv-read-more ref="uvReadMoreRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-read-more>
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvReadMoreRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvReadMoreRef);

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default { options: { name: 'ProReadMore', virtualHost: true } };
</script>
