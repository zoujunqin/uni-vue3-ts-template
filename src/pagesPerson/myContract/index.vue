<template>
  <ProPage
    class="myContract-container page-pt-with-navbar hx-bg-white hx-flex hx-flex-col"
    navbar-title="合同记录"
    show-navbar
  >
    <ProScrollList
      ref="proScrollListRef"
      :fetch="getPersonalCenterContract"
      class="hx-h-full hx-pb-[10px] hx-box-border"
    >
      <!-- <view class="hx-bg-bg-color-grey hx-flex-1 hx-pt-[10px]"> -->
      <template #default="{ row }">
        <view
          class="hx-flex hx-items-center hx-justify-between hx-bg-white hx-p-[16px_12px] hx-mb-[10px]"
          @click="handleLookContract(row)"
        >
          <view class="hx-flex hx-flex-col">
            <p class="contract-title">{{ row?.protocolName }}</p>
            <span class="contract-text">{{ row?.customerName }}</span>
            <span class="contract-text">{{ row?.workSignTime }}</span>
          </view>
          <image
            :src="import('@http/person/arrow-right.svg')"
            class="hx-w-[18px] hx-h-[18px]"
          />
        </view>
      </template>
      <!-- </view> -->
    </ProScrollList>
  </ProPage>
  <view v-if="pathUrl !== ''">
    <web-view :src="pathUrl" />
  </view>
</template>

<script lang="ts" setup>
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';

import { getPersonalCenterContract } from '@/api/fe/wechat/personal_center';
import { getWorkerProtocolByIdViewUrl } from '@/api/fe/wechat/worker';
import { useOss } from '@/hooks/useOss';

const { getPreviewUrl } = useOss();
// const dataList = ref<Array<any>>([]);
const pathUrl = ref('');
const path = ref('');

// onMounted(() => {
//   handleGetPersonalCenterContract();
// });
// onPullDownRefresh(() => {
//   handleGetPersonalCenterContract();
// });
// const handleGetPersonalCenterContract = () => {
//   getPersonalCenterContract().then(res => {
//     dataList.value = res;
//     // uni.stopPullDownRefresh();
//   });
// };
const handleLookContract = val => {
  path.value = val.path;
  if (path.value) {
    handleGetPath();
  } else {
    getWorkerProtocolByIdViewUrl(val?.id).then(res => {
      pathUrl.value = res;
    });
  }
};
const handleGetPath = async () => {
  const pdfUrl = await getPreviewUrl(path.value);
  uni.showLoading();
  uni.downloadFile({
    url: pdfUrl,
    success: downloadResult => {
      uni.openDocument({
        filePath: downloadResult.tempFilePath,
        showMenu: true
      });
    },
    fail: () => {
      uni.showToast({ title: '加载失败', icon: 'none' });
    },
    complete: () => {
      uni.hideLoading();
    }
  });
};
</script>

<style lang="scss" scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}

.myContract-container {
  .contract-title {
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 600;
    color: var(--hx-text-color-main);
  }

  .contract-text {
    margin-top: 8px;
    font-size: 14px;
    color: var(--hx-text-color);
  }
}
</style>
