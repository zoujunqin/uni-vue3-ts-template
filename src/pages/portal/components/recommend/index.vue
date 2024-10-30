<template>
  <view class="hx-h-full hx-flex hx-flex-col">
    <ProLayout>
      <template #header />

      <ProScrollList
        ref="proScrollListRef"
        :fetch="getRecommendTaskList"
        class="hx-flex-1"
      >
        <template #default="{ row }">
          <TaskCard
            id="card"
            :card-info="getHandledTaskInfo(row)"
            class="hx-mt-[10px]"
          />
        </template>
      </ProScrollList>
    </ProLayout>
  </view>
</template>

<script lang="ts" setup>
import { getHandledTaskInfo } from '../../utils/handleDataStruct';

import TaskCard from './components/TaskCard/index.vue';
import { useHandler } from './hooks/useHandler';

import { getRecommendTaskList } from '@/api/fe/wechat';
import { useTokenWatch } from '@/hooks/useTokenWatch';

const { proScrollListRef, reload } = useHandler();

useTokenWatch({ hasTokenCb: reload, noTokenCb: reload });
</script>

<script lang="ts">
export default {
  options: { name: 'TaskRecommend', virtualHost: false }
};
</script>
