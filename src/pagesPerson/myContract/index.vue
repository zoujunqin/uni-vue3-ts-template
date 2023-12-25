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
          @tap="handleLookContract(item.path)"
          class="hx-flex hx-items-center hx-justify-between hx-bg-white hx-p-[16px_12px] hx-mb-[10px]"
        >
          <view class="hx-flex hx-flex-col">
            <p class="contract-title">{{ item.protocolName }}</p>
            <span class="contract-text">{{ item.customerName }}</span>
            <span class="contract-text"
              >{{ item.uploadTime }} {{ isShowProgress }}</span
            >
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
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';

import { getPersonalCenterContract } from '@/api/fe/wechat/personal_center';
import { useOss } from '@/hooks/useOss';
import { handleDealTimestamp, handleFormatter } from '@/utils/processingText';
const monthDate = ref();
const monthDatetime = ref(new Date());
const { getPreviewUrl } = useOss();

const datetimePicker = ref();
const dataList = ref([
  {
    id: 0,
    protocolName: '业务分包服务合作协议',
    customerName: '福建智策科技有限公司',
    uploadTime: '2023-12-12 09:00',
    path: 'fe/2023-12/2023-12-22/网络安全培训20231220 _18c903376c904f6d9890894dfe0edfb7.pdf'
  },
  {
    id: 1,
    protocolName: '业务分包服务合作协议',
    customerName: '福建智策科技有限公司',
    uploadTime: '2023-12-12 09:00',
    path: 'fe/2023-12/2023-12-22/网络安全培训20231220 _18c903376c904f6d9890894dfe0edfb7.pdf'
  }
]);
onMounted(() => {
  monthDate.value = handleDealTimestamp(new Date());
  handleGetPersonalCenterContract();
});
onPullDownRefresh(() => {
  uni.startPullDownRefresh();
  handleGetPersonalCenterContract();
});
const handleGetPersonalCenterContract = () => {
  const timeData = monthDate.value.slice(0, 4) + monthDate.value.slice(5, 7);
  getPersonalCenterContract({ month: timeData }).then(res => {
    // dataList.value = res;
    uni.stopPullDownRefresh();
  });
};
const openDate = () => {
  datetimePicker.value.open();
};
const isShowProgress = ref();
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
      uni.hideLoading();
    },
    fail: () => {
      uni.showToast({ title: '加载失败', icon: 'none' });
      uni.hideLoading();
    }
  });
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
