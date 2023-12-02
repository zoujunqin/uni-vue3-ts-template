<template>
  <uv-popup ref="uvPopupRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-popup>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { uvEvents } from './events';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvPopupRef = shallowRef();
const exposeMethods = ['open', 'close'];
const { bridgedMethods } = useBridgedMethods(exposeMethods, uvPopupRef);

defineExpose({
  ...bridgedMethods
});
</script>
