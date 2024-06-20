<template>
  <uv-keyboard ref="uvKeyboardRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvKeyboardRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvKeyboardRef);
defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default {
  options: { name: 'ProKeyboard', virtualHost: true }
};
</script>
