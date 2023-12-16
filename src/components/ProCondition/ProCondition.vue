<template>
  <view class="hx-flex hx-items-end hx-p-[11px_16px]" @click="handleClick">
    <text
      class="hx-text-[14px] hx-font-[400] hx-leading-[21px] hx-text-text-color-content hx-mr-[3px]"
      :class="activeTextClass"
    >
      {{ props.title }}
    </text>
    <view class="pro-condition-icon" :style="activeIconStyle" />
  </view>
</template>

<script setup lang="ts">
import {
  ComponentInternalInstance,
  computed,
  onMounted,
  getCurrentInstance
} from 'vue';

import { conditionProps } from './props';

import { useParentComponent } from '@/hooks/useParentComponent';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps(conditionProps);
const emit = defineEmits(['change', 'update:modelValue']);

const active = useVModel(props, 'modelValue', undefined, { passive: true });

const activeTextClass = computed(() =>
  active.value ? ['!hx-text-color-primary', '!hx-font-[600]'] : []
);
const activeIconStyle = computed(() =>
  active.value ? { borderLeftColor: 'var(--hx-color-primary)' } : {}
);

const handleClick = () => {
  if (parent) parent?.exposed?.updateActive(!active.value ? props.name : null);
  else {
    active.value = !active.value;
    emit('change', active.value);
  }
};

let parent: ComponentInternalInstance | undefined;
onMounted(async () => {
  parent = useParentComponent('ProConditionGroup');
  parent?.exposed?.children?.push(getCurrentInstance());
});

const updateActive = (status: string) => {
  active.value = props.name === status;
  emit('change', active.value);
};
defineExpose({ updateActive });
</script>

<script lang="ts">
export default { options: { name: 'ProCondition', virtualHost: true } };
</script>

<style scoped>
.pro-condition-icon {
  width: 8px;
  height: 8px;
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid var(--hx-text-color-tip);
  transform: rotate(45deg);
}
</style>
