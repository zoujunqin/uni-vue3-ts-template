<template>
  <ProPage
    show-navbar
    show-tabbar
    navbar-title="任务中心"
    class="hx-bg-[#F7F8FA] hx-flex hx-flex-col"
  >
    <ProPageHeader
      class="hx-relative hx-z-1"
      :tab-index="tabIndex"
      :tab-list="tabList"
      :bg-img-url="import('@/static@http/task/task-bg.png')"
      @tab-change="handleTabChange"
      @input-confirm="handleInputConfirm"
    />

    <swiper
      :current="swiperIndex"
      class="hx-flex-1"
      @change="handleSwiperChange"
    >
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <ProScrollList
          :key="componentKey + index"
          :fetch="item.fetch"
          :initial-index="index"
          :current-index="swiperIndex"
          class="hx-h-full hx-pb-[10px] hx-box-border"
        >
          <template #default="{ row }">
            <ProTaskCard
              id="card"
              class="hx-mt-[10px]"
              :card-info="getRow(row)"
              @tap="navToTaskDetail(row)"
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
import { useTabLinkSwiper } from '@/hooks/useTabLinkSwiper';

const {
  tabIndex,
  swiperIndex,
  handleTabChange,
  handleSwiperChange,
  resetIndex
} = useTabLinkSwiper();

const { componentKey, tabList, navToTaskDetail, handleInputConfirm } =
  useHandler();

const getRow = row => {
  return {
    ...row,
    cost: row.addMonth,
    title: row.serviceContract,
    desc: row.supplierName,
    tag: row.name
  };
};

onPullDownRefresh(resetIndex);
</script>
