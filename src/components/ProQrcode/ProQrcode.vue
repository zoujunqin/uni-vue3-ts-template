<template>
  <uv-qrcode ref="uvQrcodeRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <template v-slot:[loadingSlot]>
      <slot name="loading" />
    </template>
  </uv-qrcode>
</template>

<script setup lang="ts">
import { computed, shallowRef, useSlots } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const loadingSlot = computed(() => (useSlots()?.loading ? 'loading' : ''));

const uvQrcodeRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvQrcodeRef);
defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default {
  options: { name: 'ProQrcode', virtualHost: true }
};
</script>
