<template>
  <uv-checkbox-group
    v-model="checkboxGroupValue"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  >
    <slot />
  </uv-checkbox-group>
</template>
<script setup lang="ts">
import { useVModel } from '@/hooks/useVModel';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { uvEvents } from './events';
import { checkboxProps } from './props';

const props = defineProps(checkboxProps);

const checkboxGroupValue = useVModel(props, 'modelValue');
const { bridgedEvents } = useBridgedEmits(uvEvents);
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
