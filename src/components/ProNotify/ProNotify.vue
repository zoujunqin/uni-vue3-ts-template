<template>
  <uv-notify ref="uvNotifyRef" v-bind="$attrs">
    <template #icon>
      <slot name="icon" />
    </template>
  </uv-notify>
</template>

<script setup lang="ts">
import { uvMethods } from './methods';

import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { instance: uvNotifyRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvNotifyRef);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { name: 'ProNotify', virtualHost: true } };
</script>
