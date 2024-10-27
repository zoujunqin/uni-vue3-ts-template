<template>
  <uv-keyboard ref="uvKeyboardRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvKeyboardRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvKeyboardRef);
defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default {
  options: { name: 'ProKeyboard', virtualHost: true }
};
</script>
