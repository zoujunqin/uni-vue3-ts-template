<template>
  <ProPage
    show-navbar
    navbar-title="合同记录"
    class="myContract-container page-pt-with-navbar hx-bg-white hx-flex hx-flex-col"
  >
    <view class="hx-bg-bg-color-grey hx-flex-1 hx-pt-[10px]">
      <template v-if="dataList.length > 0">
        <view
          v-for="item in dataList"
          :key="item.id"
          @click="handleLookContract(item)"
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
  </ProPage>
  <view v-if="pathUrl !== ''">
    <web-view :src="pathUrl" />
  </view>
</template>

<script setup lang="ts">
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';

import { getPersonalCenterContract } from '@/api/fe/wechat/personal_center';
import { getWorkerProtocolByIdViewUrl } from '@/api/fe/wechat/worker';
import { useOss } from '@/hooks/useOss';
const { getPreviewUrl } = useOss();
const dataList = ref<Array<any>>([]);
const pathUrl = ref('');
const path = ref('');

onMounted(() => {
  handleGetPersonalCenterContract();
});
onPullDownRefresh(() => {
  handleGetPersonalCenterContract();
});
const handleGetPersonalCenterContract = () => {
  getPersonalCenterContract().then(res => {
    dataList.value = res;
    uni.stopPullDownRefresh();
  });
};
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
