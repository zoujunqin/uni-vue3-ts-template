<template>
  <uv-drop-down ref="uvDropDownRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-drop-down>
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvDropDownRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvDropDownRef);

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default { options: { name: 'ProDropDown', virtualHost: true } };
</script>
