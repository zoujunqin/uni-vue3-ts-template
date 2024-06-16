<template>
  <uv-back-top ref="uvBackTopRef" v-bind="$attrs">
    <template v-slot:[defaultSlot]>
      <slot name="default" />
    </template>
  </uv-back-top>
</template>

<script lang="ts" setup>
import { shallowRef, computed, useSlots } from 'vue';

import { uvMethods } from './methods';

import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const defaultSlot = computed(() => (useSlots()?.default ? 'default' : ''));

const uvBackTopRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvBackTopRef);
defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default { options: { name: 'ProBackTop', virtualHost: true } };
</script>
