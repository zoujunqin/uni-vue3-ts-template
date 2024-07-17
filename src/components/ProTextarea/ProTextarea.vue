<template>
  <uv-textarea ref="uvTextareaRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvTextareaRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvTextareaRef);
defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default {
  options: { name: 'ProTextarea', virtualHost: true }
};
</script>
