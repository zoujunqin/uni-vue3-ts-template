<template>
  <ProPage
    show-navbar
    navbar-title="合同记录"
    class="myContract-container page-pt-with-navbar hx-bg-white hx-flex hx-flex-col"
  >
    <ProCondition
      v-model="conditionStatus"
      @change="openDate"
      name="contractType"
      :title="monthDate"
    />
    <view class="hx-bg-bg-color-grey hx-flex-1 hx-pt-[10px]">
      <template v-if="dataList.length > 0">
        <view
          v-for="item in dataList"
          :key="item.id"
          @click="handleLookContract(item?.path)"
          class="hx-flex hx-items-center hx-justify-between hx-bg-white hx-p-[16px_12px] hx-mb-[10px]"
        >
          <view class="hx-flex hx-flex-col">
            <p class="contract-title">{{ item?.protocolName }}</p>
            <span class="contract-text">{{ item?.customerName }}</span>
            <span class="contract-text">{{ item?.workSignTime }}</span>
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
    <ProDateTimePicker
      ref="datetimePickerRef"
      v-model="monthDatetime"
      mode="year-month"
      @confirm="handleGetPersonalCenterContract"
      @close="handleCloseDate"
    />
  </ProPage>
</template>

<script setup lang="ts">
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { computed, nextTick, onMounted, ref } from 'vue';

import { getPersonalCenterContract } from '@/api/fe/wechat/personal_center';
import { useOss } from '@/hooks/useOss';
import { handleDealTimestamp } from '@/utils/processingText';
const monthDatetime = ref(new Date());
const conditionStatus = ref(false);
const { getPreviewUrl } = useOss();
const datetimePickerRef = ref();
const dataList = ref<Array<any>>([]);

const monthDate = computed(() => {
  return handleDealTimestamp(monthDatetime.value);
});

onMounted(() => {
  handleGetPersonalCenterContract();
});
onPullDownRefresh(() => {
  handleGetPersonalCenterContract();
});
const handleCloseDate = () => {
  conditionStatus.value = false;
};
const handleGetPersonalCenterContract = () => {
  nextTick(() => {
    const timeData =
      monthDate.value.slice(0, 4) + '-' + monthDate.value.slice(5, 7);
    getPersonalCenterContract({ month: timeData }).then(res => {
      dataList.value = res;
      uni.stopPullDownRefresh();
    });
  });
};
const openDate = (bool: boolean) => {
  bool && datetimePickerRef.value.open();
};
const handleLookContract = async (path: string) => {
  const pdfUrl = await getPreviewUrl(path);
  uni.showLoading({ title: '加载中...' });
  uni.downloadFile({
    url: pdfUrl,
    success: downloadResult => {
      uni.openDocument({
        filePath: downloadResult.tempFilePath,
        showMenu: true
      });
    },
    fail: () => {
      setTimeout(() => {
        uni.showToast({ title: '加载失败', icon: 'none' });
      }, 30);
    },
    complete: () => {
      uni.hideLoading();
    }
  });
};
</script>

<style scoped lang="scss">
:deep(.pro-navbar) {
  background-color: #fff;
}
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
