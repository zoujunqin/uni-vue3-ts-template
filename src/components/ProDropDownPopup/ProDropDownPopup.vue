<template>
  <uv-drop-down-popup
    ref="uvDropDownRef"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  >
    <slot />
  </uv-drop-down-popup>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvDropDownRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvDropDownRef);

defineExpose({ ...bridgedMethods });
</script>

<script lang="ts">
export default { options: { name: 'ProDropDownPopup', virtualHost: true } };
</script>
