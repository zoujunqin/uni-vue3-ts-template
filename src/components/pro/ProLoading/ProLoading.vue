<template>
  <view v-if="loadingVisible" class="pro-loading">
    <view class="pro-loading__wrapper">
      <image
        :src="getAssetsResource('@http/loading.gif')"
        class="w-[54px] h-[54px]"
      />
      <text
        class="text-[14px] leading-[14px] font-[600] mt-[16px] text-text-color-tip"
      >
        {{ loadingText }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useLoadingStore } from '@/pinia/modules/loading';
import { getAssetsResource } from '@/utils';

const { loadingVisible, loadingText } = storeToRefs(useLoadingStore());
</script>

<script lang="ts">
export default { options: { name: 'ProLoading', virtualHost: true } };
</script>

<style scoped>
.pro-loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999999;
  width: 100%;
  height: 100%;
}

.pro-loading__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 148px;
  overflow: hidden;
  background: #fff;
  border-radius: 16px;
  transform: translateX(-50%) translateY(-50%);
}
</style>
