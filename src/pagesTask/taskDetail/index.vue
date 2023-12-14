<template>
  <ProPage
    show-navbar
    navbar-title="任务详情"
    class="page-pt-with-navbar hx-bg-white"
  >
    <view class="hx-p-[16px]">
      <TaskHeader :data="taskDetail" />

      <ProDivider />

      <BaseNeeds :data="taskDetail" />

      <TaskDescribe :data="taskDetail" />

      <TaskPlace :data="taskDetail" />

      <SecurityTip :data="taskDetail" />

      <ProButton type="primary"> 申请任务 </ProButton>
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { shallowRef } from 'vue';

import BaseNeeds from './components/BaseNeeds.vue';
import SecurityTip from './components/SecurityTip.vue';
import TaskDescribe from './components/TaskDescribe.vue';
import TaskHeader from './components/TaskHeader.vue';
import TaskPlace from './components/TaskPlace.vue';

import { ITaskDetail, getTaskDetail } from '@/api/fe/wechat/task';

const taskDetail = shallowRef<ITaskDetail>();
onLoad(query => {
  getTaskDetail(query?.id).then(res => {
    taskDetail.value = res;
  });
});
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
