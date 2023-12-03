<template>
  <uv-count-down
    class="pro-count-down"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  />
</template>

<script setup lang="ts">
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { uvEvents } from './events';
import { uvMethods } from './methods';

const { bridgedEvents } = useBridgedEmits(uvEvents);
const { bridgedMethods } = useBridgedMethods(uvMethods);

defineExpose({
  ...bridgedMethods
});
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
