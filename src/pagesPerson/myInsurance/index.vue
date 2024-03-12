<template>
  <ProPage
    show-navbar
    navbar-title="我的商保"
    class="page-pt-with-navbar hx-bg-white"
  >
    <view class="hx-bg-bg-color-grey hx-h-full hx-py-[10px]">
      <template v-if="insuranceList.length > 0">
        <view
          v-for="(item, index) in insuranceList"
          :key="index"
          class="hx-flex hx-items-center hx-bg-white hx-mb-[10px] hx-pl-[15px] hx-py-[17px]"
        >
          <image
            class="hx-w-[50px] hx-h-[50px] hx-mr-[12px]"
            :src="import('@http/person/insurance-icon.svg')"
          />
          <view class="hx-w-[250px]">
            <p class="hx-text-text-color hx-text-[16px] hx-truncate">
              {{ item?.insuranceName }}
            </p>
          </view>
        </view>
      </template>
      <ProPlaceholder
        v-else
        type="noData"
        @refresh="handleGetPersonalCenterInsurance"
      />
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';

import { getPersonalCenterInsurance } from '@/api/fe/wechat/personal_center';

const insuranceList = ref<Array<any>>([]);

onMounted(() => {
  handleGetPersonalCenterInsurance();
});
onPullDownRefresh(() => {
  handleGetPersonalCenterInsurance();
});
const handleGetPersonalCenterInsurance = () => {
  getPersonalCenterInsurance().then(res => {
    insuranceList.value = res;
    uni.stopPullDownRefresh();
  });
};
</script>

<style scoped></style>
