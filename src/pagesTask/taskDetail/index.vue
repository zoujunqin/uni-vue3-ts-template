<template>
  <ProPage
    class="page-pt-with-navbar hx-bg-white"
    navbar-title="任务详情"
    show-navbar
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

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { shallowRef } from 'vue';

import BaseNeeds from './components/BaseNeeds.vue';
import SecurityTip from './components/SecurityTip.vue';
import TaskDescribe from './components/TaskDescribe.vue';
import TaskHeader from './components/TaskHeader.vue';
import TaskPlace from './components/TaskPlace.vue';

import { applyTask, getTaskDetail, ITaskDetail } from '@/api/fe/wechat/task';
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
  uni.navigateTo({
    url: `/pagesAuth/realName/index`
  });
  applyTask(taskId.value).then(res => {
    const current = dealStepCurrent(res);
    console.log('current:', current);
    uni.navigateTo({
      url: `/pagesAuth/realName/index?taskId=${taskId.value}&current=${current}`
    });
  });
};
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
