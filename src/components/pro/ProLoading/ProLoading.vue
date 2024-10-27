<template>
  <view v-if="loadingVisible" class="pro-loading">
    <view class="pro-loading__wrapper">
      <image
        :src="import('@http/loading.gif')"
        class="hx-w-[54px] hx-h-[54px]"
      />
      <text
        class="hx-text-[14px] hx-leading-[14px] hx-font-[600] hx-mt-[16px] hx-text-text-color-tip"
      >
        {{ loadingText }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useLoadingStore } from '@/pinia/modules/loading';

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
