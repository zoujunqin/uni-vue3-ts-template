<template>
  <view class="hx-flex hx-flex-col hx-items-center hx-mt-[30%]">
    <image :src="data.image" class="hx-w-[140px] hx-h-[140px]" />
    <text
      class="hx-mt-[20px] hx-text-text-color hx-text-font-size-regular hx-font-[500] hx-leading-[16px]"
    >
      {{ data.title }}
    </text>
    <text
      class="hx-mt-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400]"
    >
      {{ data.subTitle }}
    </text>

    <ProButton
      v-if="buttonMap.refresh(type)"
      class="hx-mt-[20px] hx-w-[108px]"
      type="primary"
      text="刷新一下"
    />
    <ProButton
      v-if="buttonMap.checkNetwork(type)"
      class="hx-mt-[16px] hx-w-[108px]"
      plain
      type="primary"
      text="检查网络"
    />
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

const data: ComputedRef<(typeof typeMap)[keyof typeof typeMap]> = computed(
  () => typeMap[props.type]
);
</script>
