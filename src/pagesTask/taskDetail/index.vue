<template>
  <ProPage
    class="page-pt-with-navbar hx-bg-white"
    navbar-title="任务详情"
    show-navbar
  >
    <view class="hx-p-[16px_16px_54px_16px]">
      <TaskHeader
        :data="taskDetail"
        :statusShow="!!taskDetail?.undertakingStatusName"
      />
      <ProDivider />

      <BaseNeeds :data="taskDetail" />

      <TaskDescribe :data="taskDetail" />

      <TaskPlace :data="taskDetail" />

      <SecurityTip :data="taskDetail" />
      <ProPageFooter>
        <ProButton
          v-if="taskDetail?.izApplied === 'no'"
          type="primary"
          @click="handleApplyTask"
        >
          申请任务
        </ProButton>
      </ProPageFooter>
    </view>
  </ProPage>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { debounce } from 'lodash-es';
import { ref, shallowRef } from 'vue';

import BaseNeeds from './components/BaseNeeds.vue';
import SecurityTip from './components/SecurityTip.vue';
import TaskDescribe from './components/TaskDescribe.vue';
import TaskHeader from './components/TaskHeader.vue';
import TaskPlace from './components/TaskPlace.vue';

import { applyTask, getTaskDetail, ITaskDetail } from '@/api/fe/wechat/task';
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
const handleApplyTask = debounce(() => {
  applyTask(queryParams.value).then(res => {
    const current = dealStepCurrent(res);
    if (current === -1) {
      uni.showToast({
        title: '申请成功',
        icon: 'none'
      });
      handleGetTaskDetail();
    } else {
      const { taskId, orderDetailId, sourceType } = queryParams.value;
      const taskQueryParams = {
        taskId: taskId,
        orderDetailId: orderDetailId,
        sourceType: sourceType,
        current: current
      };
      uni.navigateTo({
        url: `/pagesAuth/realName/index?taskQueryParams=${JSON.stringify(
          taskQueryParams
        )}`
      });
    }
  });
}, 500);
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
