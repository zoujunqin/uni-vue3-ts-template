<template>
  <view v-if="data.content">
    <view class="section-title hx-mb-[10px]"> 任务描述 </view>
    <ProReadMore
      ref="readMoreRef"
      show-height="313px"
      :toggle="true"
      close-text="查看更多"
      class="hx-mb-[24px]"
    >
      <view> {{ data.content }}</view>
    </ProReadMore>
  </view>
  <view v-if="data.remark">
    <view class="section-title hx-mb-[10px]"> 任务成果 </view>
    <ProReadMore
      ref="readMoreRef"
      show-height="313px"
      :toggle="true"
      close-text="查看更多"
      class="hx-mb-[24px]"
    >
      <view> {{ data.remark }}</view>
    </ProReadMore>
  </view>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';

import { ITaskDetail } from '@/api/fe/wechat/task';

const props = defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  }
});
const readMoreRef = ref();
watch(
  () => props.data,
  () => {
    readMoreRef.value.init();
  }
);
</script>
