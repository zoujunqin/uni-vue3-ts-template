<template>
  <uv-count-down
    ref="uvCountDownRef"
    class="pro-count-down"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  />
</template>

<script setup lang="ts">
import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const { instance: uvCountDownRef } = useFakerRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvCountDownRef);

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default { options: { name: 'ProCountDown', virtualHost: true } };
</script>
