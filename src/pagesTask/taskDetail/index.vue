<template>
  <ProPage
    class="page-pt-with-navbar hx-bg-white"
    navbar-title="任务详情"
    show-navbar
  >
    <view>
      <ProSkeleton class="skeleton" :loading="loading">
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
        </view>
      </ProSkeleton>
    </view>

    <ProPageFooter>
      <ProButton
        v-if="taskDetail?.izApplied === YES_NO_TYPE.NO"
        type="primary"
        @click="handleApplyTask"
      >
        申请任务
      </ProButton>
    </ProPageFooter>
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
import { REAL_STATUS, YES_NO_TYPE } from '@/constant/taskDetail';
import { getRealStatus } from '@/utils/index';
import { handleRealStatusTo } from '@/utils/lockPlugin';

const taskDetail = shallowRef<ITaskDetail>();
const routeParams = shallowRef<Record<string, any>>({});
const loading = shallowRef(false);

const handleGetTaskDetail = () => {
  loading.value = true;
  getTaskDetail(routeParams.value)
    .then(res => {
      taskDetail.value = res;
    })
    .finally(() => {
      loading.value = false;
    });
};

onLoad(query => {
  routeParams.value = JSON.parse(query?.params);
  handleGetTaskDetail();
});

const handleApplyTask = () => {
  applyTask(routeParams.value).then(res => {
    const realStatus = getRealStatus(res);

    // 已经实名并且签署合同了
    if (realStatus === REAL_STATUS.ALREADY_REAL) {
      uni.showToast({
        title: '申请成功',
        icon: 'none'
      });
      handleGetTaskDetail();
      return;
    }

    const { taskId, orderDetailId, sourceType } = routeParams.value;
    const taskQueryParams = JSON.stringify({
      taskId: taskId,
      orderDetailId: orderDetailId,
      sourceType: sourceType
    });
    const params = `?taskQueryParams=${taskQueryParams}`;
    const paramsQuery = {
      realStatus,
      params,
      jump: 'navigateTo'
    };
    handleRealStatusTo(paramsQuery);
  });
};
</script>

<style scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
