<template>
  <ProLayout>
    <ProContent>
      <ProScrollList
        ref="proScrollListRef"
        :fetch="getRecommendTaskList"
        class="hx-flex-1"
      >
        <template #default="{ row }"> {{ row.taskContent }} </template>
      </ProScrollList>
    </ProContent>
  </ProLayout>
</template>

<script lang="ts" setup>
import { useHandler } from './hooks/useHandler';

import { getRecommendTaskList } from '@/api/fe/wechat';
import ProLayout from '@/components/pro/ProLayout/ProLayout.vue';
import { useTokenWatch } from '@/hooks/useTokenWatch';

const { proScrollListRef, reload } = useHandler();

useTokenWatch({ hasTokenCb: reload, noTokenCb: reload });
</script>

<script lang="ts">
export default {
  options: { name: 'TaskRecommend', virtualHost: true }
};
</script>
