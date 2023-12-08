<template>
  <view class="section-title hx-mb-[10px]"> 任务描述 </view>
  <ProReadMore
    show-height="313px"
    :toggle="true"
    close-text="查看更多"
    class="hx-mb-[24px]"
  >
    <view> {{ data.describe }} </view>
  </ProReadMore>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
</script>
