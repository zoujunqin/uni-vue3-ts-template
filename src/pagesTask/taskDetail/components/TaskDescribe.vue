<template>
  <view v-if="data.content" class="section-title hx-mb-[10px]"> 任务描述 </view>

  <ProSkeletonRect width="100%" height="50px" margin-bottom="20px">
    <ProReadMore
      v-if="data.content"
      show-height="313px"
      :toggle="true"
      close-text="查看更多"
      class="hx-mb-[24px]"
    >
      <view> {{ data.content }}</view>
    </ProReadMore>
  </ProSkeletonRect>

  <view v-if="data.remark" class="section-title hx-mb-[10px]"> 任务成果 </view>

  <ProSkeletonRect width="100%" height="186px">
    <ProReadMore
      v-if="data.remark"
      show-height="313px"
      :toggle="true"
      close-text="查看更多"
      class="hx-mb-[24px]"
    >
      <view> {{ data.remark }}</view>
    </ProReadMore>
  </ProSkeletonRect>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { ITaskDetail } from '@/api/fe/wechat/task';

defineProps({
  data: {
    type: Object as PropType<ITaskDetail>,
    default: () => ({})
  }
});
</script>
