<template>
  <uv-tabbar-item
    ref="uvTabbarItemRef"
    v-bind="{ ...$attrs, ...bridgedEvents }"
  >
    <template #active-icon>
      <slot name="active-icon" />
    </template>

    <template #inactive-icon>
      <slot name="inactive-icon" />
    </template>

    <template #text>
      <text
        :style="getSelectedConfig.textStyle"
        class="text-[12px] font-[600] leading-[16px]"
      >
        {{ props.text }}
      </text>
    </template>
  </uv-tabbar-item>
</template>
<script lang="ts" setup>
import uvTabbarItemProps from '@climblee/uv-ui/components/uv-tabbar-item/props.js';
import { ref } from 'vue';
import { computed } from 'vue-demi';

import { uvEvents } from '../ProTabbar/events';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const props = defineProps(uvTabbarItemProps);

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvTabbarItemRef = ref();
const getSelectedConfig = computed(() => {
  return {
    textStyle: {
      color: uvTabbarItemRef.value?.isActive
        ? 'var(--text-color-theme)'
        : 'var(--text-color-tip)'
    }
  };
});
</script>

<script lang="ts">
export default { options: { name: 'ProTabbarItem', virtualHost: true } };
</script>
