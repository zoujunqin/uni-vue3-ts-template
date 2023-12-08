<template>
  <view class="section-title hx-mb-[10px]"> 任务地点 </view>
  <view class="section-content hx-h-[186px] hx-rounded-[6px] hx-mb-[16px]" />
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
