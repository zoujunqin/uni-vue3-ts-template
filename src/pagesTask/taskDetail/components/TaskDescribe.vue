<template>
  <view class="section-title hx-mb-[10px]"> 任务描述 </view>
  <ProReadMore
    show-height="313px"
    :toggle="true"
    close-text="查看更多"
    class="hx-mb-[24px]"
  >
    <view> {{ data.content }} </view>
  </ProReadMore>
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
