<template>
  <uv-count-to ref="uvCountToRef" v-bind="{ ...$attrs, ...bridgedEvents }" />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvCountToRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvCountToRef);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { name: 'ProCountTo', virtualHost: true } };
</script>
