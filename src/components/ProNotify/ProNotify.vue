<template>
  <uv-notify ref="uvNotifyRef" v-bind="$attrs">
    <template #icon>
      <slot name="icon" />
    </template>
  </uv-notify>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvMethods } from './methods';

import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const uvNotifyRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvNotifyRef);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { name: 'ProNotify', virtualHost: true } };
</script>
