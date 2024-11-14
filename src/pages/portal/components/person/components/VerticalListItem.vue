<template>
  <view>
    <view class="flex" @click="emitClick">
      <view class="w-[146px] flex items-center">
        <slot name="icon">
          <image :src="data.icon" class="w-[20px] h-[20px] mr-[4px]" />
        </slot>
        <text
          class="text-font-size-base text-text-color leading[22px] font-[500]"
        >
          {{ data.desc }}
        </text>
      </view>
      <view class="flex-1 flex items-center justify-end">
        <slot name="text">
          <text
            class="text-font-size-regular font-bold text-text-color-theme mr-[2px]"
          >
            {{ data.text }}
          </text>
        </slot>
        <image
          :src="getAssetsResource('@http/person/arrow-right.svg')"
          class="w-[14px] h-[14px]"
        />
      </view>
    </view>
    <ProGap
      v-if="data.index % 2 === 0 && listLength > 1"
      height="1"
      bgColor="#F2F2F2"
      marginTop="16"
    />
  </view>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

import { getAssetsResource } from '@/utils';

interface IDataType {
  index: number;
  icon?: unknown;
  desc: string;
  text?: string;
}

defineProps({
  data: {
    type: Object as PropType<IDataType>,
    default: () => ({})
  },
  listLength: {
    type: Number,
    default: 0
  }
});
const emits = defineEmits(['click']);

const emitClick = () => {
  emits('click');
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
