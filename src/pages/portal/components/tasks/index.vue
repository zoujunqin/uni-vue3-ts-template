<template>
  <view class="hx-h-full hx-flex hx-flex-col">
    <ProPageHeader
      ref="proPageHeaderRef"
      :bg-img-url="import('@http/task/task-bg.png')"
      :tab-index="tabIndex"
      :tab-list="tabList"
      class="hx-relative hx-z-1"
      @tab-change="handleTabChange"
      @input-confirm="(val: string) => handleInputConfirm(val, tabIndex)"
    />

    <swiper
      :current="swiperIndex"
      class="hx-flex-1"
      @change="handleSwiperChange"
    >
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <ProScrollList
          ref="proScrollListRef"
          :key="componentKey + index"
          :current-index="swiperIndex"
          :extend-params="getExtendParams(item.type)"
          :fetch="item.fetch"
          :initial-index="index"
          class="hx-h-full hx-pb-[10px] hx-box-border"
        >
          <template #default="{ row }">
            <ProTaskCard
              id="card"
              :card-info="getHandledTaskInfo(row)"
              class="hx-mt-[10px]"
              @click="navToTaskDetail(row)"
            />
          </template>
        </ProScrollList>
      </swiper-item>
    </swiper>
  </view>
</template>
<script lang="ts" setup>
import { getHandledTaskInfo } from '../../utils/handleDataStruct';

import { useHandler } from './hooks/useHandler';

import { useTabLinkSwiper } from '@/hooks/useTabLinkSwiper';
import { useTokenWatch } from '@/hooks/useTokenWatch';

const { tabIndex, swiperIndex, handleTabChange, handleSwiperChange } =
  useTabLinkSwiper();

const {
  proScrollListRef,
  proPageHeaderRef,
  componentKey,
  tabList,
  reload,
  navToTaskDetail,
  handleInputConfirm,
  getExtendParams
} = useHandler();

useTokenWatch({
  hasTokenCb: reload,
  noTokenCb: () => {
    proScrollListRef.value?.complete?.();
  }
});
</script>

<script lang="ts">
export default {
  options: { name: 'TaskCenter', virtualHost: false }
};
</script>
