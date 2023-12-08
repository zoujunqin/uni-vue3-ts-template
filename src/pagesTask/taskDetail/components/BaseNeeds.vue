<template>
  <view class="section-title hx-mb-[10px]"> 基本需求 </view>
  <view
    class="section-content hx-mb-[16px] hx-rounded-[6px] hx-p-[12px] hx-text-text-color hx-text-[13px] hx-font-[400] hx-leading-[18px]"
  >
    <view class="hx-mb-[10px]">
      人员要求： {{ data.personalRequirement }}
    </view>
    <view class="hx-mb-[10px]"> 任务时间： {{ data.taskTime }} </view>
    <view> 任务需求： {{ data.taskRequirement }} </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style scoped>
.section-content {
  background-color: rgb(61 134 242 / 6%);
}
</style>
