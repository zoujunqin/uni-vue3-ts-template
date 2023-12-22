<template>
  <ProPage
    show-navbar
    navbar-title="合同记录"
    class="myContract-container page-pt-with-navbar hx-bg-white"
  >
    <ProCondition @tap="openDate" name="taskType" :title="monthDate" />
    <view class="hx-bg-bg-color-grey hx-h-full hx-py-[10px]">
      <template v-if="dataList.length > 0">
        <view
          v-for="item in dataList"
          :key="item.id"
          class="hx-flex hx-items-center hx-justify-between hx-bg-white hx-p-[16px_12px] hx-mb-[10px]"
        >
          <view class="hx-flex hx-flex-col">
            <p class="contract-title">{{ item.protocolName }}</p>
            <span class="contract-text">{{ item.customerName }}</span>
            <span class="contract-text">{{ item.uploadTime }}</span>
          </view>
          <image
            :src="import('@http/person/arrow-right.svg')"
            class="hx-w-[18px] hx-h-[18px]"
          />
        </view>
      </template>
      <ProPlaceholder
        v-else
        type="noData"
        @refresh="handleGetPersonalCenterContract"
      />
    </view>
    <uv-datetime-picker
      ref="datetimePicker"
      v-model="monthDatetime"
      mode="year-month"
      :formatter="handleFormatter"
      @confirm="handleConfirmDate"
    />
  </ProPage>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getPersonalCenterContract } from '@/api/fe/wechat/personal_center';
import { handleDealTimestamp, handleFormatter } from '@/utils/processingText';
const monthDate = ref();
const monthDatetime = ref(new Date());

const datetimePicker = ref();
const dataList = ref([]);
onMounted(() => {
  monthDate.value = handleDealTimestamp(new Date());
  handleGetPersonalCenterContract();
});
const handleGetPersonalCenterContract = () => {
  const timeData = monthDate.value.slice(0, 4) + monthDate.value.slice(5, 7);
  getPersonalCenterContract({ month: timeData }).then(res => {
    dataList.value = res;
  });
};
const openDate = () => {
  datetimePicker.value.open();
};
const handleConfirmDate = async (val: any) => {
  monthDate.value = await handleDealTimestamp(val.value);
  handleGetPersonalCenterContract();
};
</script>

<style scoped lang="scss">
.myContract-container {
  .contract-title {
    color: var(--hx-text-color-main);
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  .contract-text {
    color: var(--hx-text-color);
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>
