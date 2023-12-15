<template>
  <uv-count-down
    ref="uvCountDownRef"
    class="pro-count-down"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  />
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvCountDownRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvCountDownRef);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { name: 'ProCountDown', virtualHost: true } };
</script>
