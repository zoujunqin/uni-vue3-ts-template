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
        class="hx-text-[12px] hx-font-[600] hx-leading-[16px]"
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

import { uvEvents } from '@/components/ProTabbar/events';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const props = defineProps(uvTabbarItemProps);

const { bridgedEvents } = useBridgedEmits(uvEvents);

const uvTabbarItemRef = ref();
const getSelectedConfig = computed(() => {
  return {
    textStyle: {
      color: uvTabbarItemRef.value?.isActive
        ? 'var(--hx-text-color-theme)'
        : 'var(--hx-text-color-tip)'
    }
  };
});
</script>

<script lang="ts">
export default { options: { name: 'ProTabbarItem', virtualHost: true } };
</script>
