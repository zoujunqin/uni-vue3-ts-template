<template>
  <view class="hx-flex">
    <view class="hx-w-[146px] hx-flex hx-items-center">
      <slot name="icon">
        <image :src="data.icon" class="hx-w-[20px] hx-h-[20px] hx-mr-[4px]" />
      </slot>
      <text
        class="hx-text-font-size-base hx-text-text-color hx-leading[22px] hx-font-[500]"
      >
        {{ data.desc }}
      </text>
    </view>
    <view class="hx-flex-1 hx-flex hx-items-center hx-justify-end">
      <slot name="text">
        <text
          class="hx-text-font-size-regular hx-font-bold hx-text-[#3d86f2] hx-mr-[2px]"
        >
          {{ data.text }}
        </text>
      </slot>
      <image :src="ArrowIcon" class="hx-w-[14px] hx-h-[14px]" />
    </view>
  </view>
</template>
<script setup lang="ts">
import ArrowIcon from '@/static/local/arrow-right.png';
import { PropType } from 'vue';

interface IDataType {
  icon?: unknown;
  desc: string;
  text?: string;
}

defineProps({
  data: {
    type: Object as PropType<IDataType>,
    default: () => ({})
  }
});
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
};
</script>
