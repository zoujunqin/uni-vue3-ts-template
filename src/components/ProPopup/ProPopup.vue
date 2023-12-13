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
import { uvMethods } from './methods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvPopupRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvPopupRef);

defineExpose({
  ...bridgedMethods
});
</script>
