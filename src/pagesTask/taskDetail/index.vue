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
      <ProDivider />

      <BaseNeeds :data="taskDetail" />

      <TaskDescribe :data="taskDetail" />

      <TaskPlace :data="taskDetail" />

      <SecurityTip :data="taskDetail" />

      <ProButton
        v-if="taskDetail?.izApplied === 'no'"
        type="primary"
        @click="handleApplyTask"
      >
        申请任务
      </ProButton>
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref, shallowRef } from 'vue';

import BaseNeeds from './components/BaseNeeds.vue';
import SecurityTip from './components/SecurityTip.vue';
import TaskDescribe from './components/TaskDescribe.vue';
import TaskHeader from './components/TaskHeader.vue';
import TaskPlace from './components/TaskPlace.vue';

import { ITaskDetail, getTaskDetail, applyTask } from '@/api/fe/wechat/task';
import { dealStepCurrent } from '@/utils/index';

const taskDetail = shallowRef<ITaskDetail>();
const queryParams = ref();
onLoad(query => {
  queryParams.value = JSON.parse(query?.params);
  handleGetTaskDetail();
});
const handleGetTaskDetail = () => {
  getTaskDetail(queryParams.value).then(res => {
    taskDetail.value = res;
  });
};
const handleApplyTask = () => {
  applyTask(queryParams.value).then(res => {
    const current = dealStepCurrent(res);
    if (current === -1) {
      uni.showToast({
        title: '申请成功',
        icon: 'none'
      });
      handleGetTaskDetail();
    } else {
      const taskQueryParams = {
        taskId: queryParams.value.taskId,
        orderDetailId: queryParams.value.orderDetailId,
        current: current
      };
      uni.navigateTo({
        url: `/pagesAuth/realName/index?taskQueryParams=${JSON.stringify(
          taskQueryParams
        )}`
      });
    }
  });
};
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
