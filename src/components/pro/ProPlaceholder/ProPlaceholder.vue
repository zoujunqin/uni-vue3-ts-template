<template>
  <view class="flex flex-col items-center mt-[30%]">
    <image :src="data.image" class="w-[140px] h-[140px]" />
    <text
      class="mt-[20px] text-text-color text-font-size-regular font-[500] leading-[16px]"
    >
      {{ data.title }}
    </text>
    <text class="mt-[10px] text-text-color-tip text-font-size-base font-[400]">
      {{ data.subTitle }}
    </text>

    <ProButton
      v-if="buttonMap.refresh(type)"
      class="mt-[20px] w-[108px]"
      type="primary"
      @click="handleRefresh"
    >
      刷新一下
    </ProButton>
    <ProButton
      v-if="buttonMap.checkNetwork(type)"
      class="mt-[16px] w-[108px]"
      plain
      type="primary"
    >
      检查网络
    </ProButton>
  </view>
</template>
<script setup lang="ts">
import { computed, ComputedRef, PropType } from 'vue';

import { typeMap, buttonMap, EMPTY_DATA } from './const';

const props = defineProps({
  type: {
    type: String as PropType<keyof typeof typeMap>,
    default: EMPTY_DATA
  }
});
const emit = defineEmits(['refresh']);

const data: ComputedRef<(typeof typeMap)[keyof typeof typeMap]> = computed(
  () => typeMap[props.type]
);

const handleRefresh = () => {
  emit('refresh');
};
</script>

<script lang="ts">
export default { options: { name: 'ProPlaceholder', virtualHost: true } };
</script>
