<template>
  <uv-popup ref="uvPopupRef" v-bind="{ ...$attrs, ...bridgedEvents }">
    <slot />
  </uv-popup>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvPopupRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvPopupRef);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { name: 'ProPopup', virtualHost: true } };
</script>
