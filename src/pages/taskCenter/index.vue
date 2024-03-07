<template>
  <ProPage
    show-navbar
    show-tabbar
    navbar-title="任务中心"
    class="hx-bg-[#F7F8FA] hx-flex hx-flex-col"
  >
    <ProPageHeader
      ref="proPageHeaderRef"
      class="hx-relative hx-z-1"
      :tab-index="tabIndex"
      :tab-list="tabList"
      :bg-img-url="import('@http/task/task-bg.png')"
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
          :fetch="item.fetch"
          :initial-index="index"
          :current-index="swiperIndex"
          :extend-params="getExtendParams(item.type)"
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
  </ProPage>
</template>
<script setup lang="ts">
import { onPullDownRefresh } from '@dcloudio/uni-app';

import { useHandler } from './hooks/useHandler';
import { getHandledTaskInfo } from './utils/handleDataStruct';

import { useTabLinkSwiper } from '@/hooks/useTabLinkSwiper';

const { tabIndex, swiperIndex, handleTabChange, handleSwiperChange } =
  useTabLinkSwiper();

const {
  proScrollListRef,
  proPageHeaderRef,
  componentKey,
  tabList,
  navToTaskDetail,
  handleInputConfirm,
  getExtendParams
} = useHandler();

onPullDownRefresh(() => {
  proPageHeaderRef.value?.clearInput();
  handleInputConfirm('', tabIndex.value);
  uni.stopPullDownRefresh();
});
</script>
