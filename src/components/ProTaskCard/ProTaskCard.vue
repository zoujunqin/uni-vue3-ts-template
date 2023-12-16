<template>
  <view class="hx-p-[16px_12.5px] hx-bg-[#fff]" @click="handleClick">
    <view class="hx-flex hx-items-end hx-justify-between hx-mb-[10px]">
      <text
        class="hx-text-color-title hx-text-[20px] hx-font-[500] hx-leading-[27px]"
      >
        {{ cardInfo.title }}
      </text>
      <text
        class="hx-text-color-primary hx-text-font-size-regular hx-font-bold hx-leading-[20px]"
      >
        {{ cardInfo.cost }}
      </text>
    </view>

    <slot name="tag">
      <ProTags
        v-if="cardInfo.tag"
        :text="cardInfo.tag"
        type="info"
        size="medium"
        color="var(--hx-text-color-tip)"
        bg-color="#f5f5f5"
        border-color="transparent"
        class="hx-mb-[10px] !hx-inline-block"
      />
    </slot>

    <view
      class="text-ellipsis hx-text-[13px] hx-font-[400] hx-leading-[18px] hx-text-text-color"
    >
      {{ cardInfo.desc }}
    </view>
  </view>
</template>
<script setup lang="ts">
import { taskCardProps } from './props';

defineProps(taskCardProps);
const emit = defineEmits(['click']);
const handleClick = () => {
  emit('click');
};
</script>

<script lang="ts">
export default { options: { name: 'ProTaskCard', virtualHost: true } };
</script>
