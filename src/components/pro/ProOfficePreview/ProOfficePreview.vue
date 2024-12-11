<template>
  <ProPopup
    ref="downloadProgressPopupRef"
    mode="bottom"
    round="10"
    :closeOnClickOverlay="false"
  >
    <view class="p-[20px]">
      <text class="text-[12px]"> 文件下载中... </text>
      <ProLineProgress
        class="mt-[10px]"
        showText
        :percentage="downloadProgress"
      />
    </view>
  </ProPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const downloadProgressPopupRef = ref();
const downloadProgress = ref(0);
function openDocument(url) {
  downloadProgressPopupRef.value.open();
  let downloadTask = uni.downloadFile({
    url,
    success(res) {
      uni.openDocument({
        showMenu: true,
        filePath: res.tempFilePath,
        fail() {
          uni.showToast({ title: '文件打开失败', icon: 'none' });
        }
      });
    },
    fail() {
      uni.showToast({ title: '文件下载失败', icon: 'none' });
    },
    complete() {
      downloadTask = null;
      downloadProgress.value = 0;
      downloadProgressPopupRef.value.close();
    }
  });

  downloadTask?.onProgressUpdate(({ progress }) => {
    downloadProgress.value = progress;
  });
}

defineExpose({ openDocument });
</script>
