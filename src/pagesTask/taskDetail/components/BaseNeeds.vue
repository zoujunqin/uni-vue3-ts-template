<template>
  <view class="section-title hx-mb-[10px]"> 基本需求 </view>
  <view
    class="section-content hx-mb-[16px] hx-rounded-[6px] hx-p-[12px] hx-text-text-color hx-text-[13px] hx-font-[400] hx-leading-[18px]"
  >
    <view class="hx-mb-[10px]">
      人员要求：
      {{ getPersonRequire }}
    </view>
    <view class="hx-mb-[10px]">
      任务时间： {{ hyphenAB(data.beginDate, data.endDate) }}
    </view>
    <view> 任务需求： {{ data.description }} </view>
  </view>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';

import { ITaskDetail } from '@/api/fe/wechat/task';
import { hyphenAB } from '@/utils/processingText';

const props = defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  }
});

const getPersonRequire = computed(() => {
  const { data } = props;
  return (
    `性别${getUnLimitText(data.genderName)}` +
    `、年龄${
      data.ageMin
        ? hyphenAB(data.ageMin, data.ageMax, '-')
        : getUnLimitText(data.ageMin)
    }` +
    `、${getUnLimitText(data.educationName)}`
  );
});

const getUnLimitText = (val: unknown) => val || '不限';
</script>

<style scoped>
.section-content {
  background-color: rgb(61 134 242 / 6%);
}
</style>
