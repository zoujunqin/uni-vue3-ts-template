<template>
  <uv-count-down
    ref="uvCountDownRef"
    class="pro-count-down"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  />
</template>

<script setup lang="ts">
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { uvEvents } from './events';
import { uvMethods } from './methods';
import { shallowRef } from 'vue';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvCountDownRef = shallowRef();
const { bridgedMethods } = useBridgedMethods(uvMethods, uvCountDownRef);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
