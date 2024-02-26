<template>
  <ProPage
    show-navbar
    navbar-title="任务详情"
    class="page-pt-with-navbar hx-bg-white"
  >
    <view class="hx-p-[16px]">
      <TaskHeader
        :data="taskDetail"
        :statusShow="!!taskDetail?.undertakingStatusName"
      />
      <!-- <TaskHeader :data="taskDetail" :statusShow="statusShow" /> -->

      <ProDivider />

      <BaseNeeds :data="taskDetail" />

      <TaskDescribe :data="taskDetail" />

      <TaskPlace :data="taskDetail" />

      <SecurityTip :data="taskDetail" />

      <ProButton type="primary" @click="handleApplyTask"> 申请任务 </ProButton>
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

import { ITaskDetail, getTaskDetail, applyTask } from '@/api/fe/wechat/task';
import { dealStepCurrent } from '@/utils/index';

const taskDetail = shallowRef<ITaskDetail>();
const statusShow = shallowRef<boolean>(false);
const taskId = shallowRef();
onLoad(query => {
  statusShow.value = JSON.parse(query?.status);
  taskId.value = query?.id;
  handleGetTaskDetail();
});
const handleGetTaskDetail = () => {
  getTaskDetail(taskId.value).then(res => {
    taskDetail.value = res;
  });
};
const handleApplyTask = () => {
  applyTask(taskId.value).then(res => {
    // const current = dealStepCurrent(res);
    // uni.navigateTo({
    //   url: `/pagesAuth/realName/index?taskId=${taskId.value}&current=${current}`
    // });
    uni.navigateTo({
      url: `/pagesAuth/realName/index?taskId=${taskId.value}&current=${0}`
    });
  });
};
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
