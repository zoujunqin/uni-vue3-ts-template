<template>
  <ProDropDown
    v-bind="$attrs"
    :is-sticky="false"
    class="hx-flex hx-items-center hx-h-[44px]"
  >
    <slot />
  </ProDropDown>
</template>

<script setup lang="ts">
import { ComponentInternalInstance, watch, nextTick } from 'vue';
import { conditionGroupProps } from './props';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps(conditionGroupProps);
const active = useVModel(props, 'modelValue', undefined, { passive: true });

const children: Array<ComponentInternalInstance> = [];
const updateChildren = async () => {
  await nextTick();
  children.forEach(child => {
    child.exposed?.updateActive(active.value);
  });
};
watch(() => active.value, updateChildren);

const updateActive = (val: string) => {
  active.value = val;
};
defineExpose({ updateActive, children });
</script>

<script lang="ts">
export default { options: { name: 'ProConditionGroup', virtualHost: true } };
</script>

<style scoped>
:deep(.uv-drop-down) {
  justify-content: unset;
  background-color: unset;
  border-bottom: unset;
}
</style>
