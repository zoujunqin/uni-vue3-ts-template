<template>
  <ProPage
    class="page-pt-with-navbar hx-bg-white"
    navbar-title="银行卡"
    show-navbar
  >
    <view class="hx-bg-bg-color-grey hx-h-full hx-px-[12px] hx-py-[10px]">
      <template v-if="bankList.length > 0">
        <view
          v-for="(item, index) in bankList"
          :key="index"
          class="hx-flex hx-items-center hx-bg-white hx-mb-[10px] hx-pl-[15px] hx-py-[24px] hx-rounded-[14px]"
        >
          <image
            :src="import('@http/person/card-icon.svg')"
            class="hx-w-[50px] hx-h-[50px] hx-mr-[10px]"
          />
          <view class="hx-w-[250px]">
            <p class="hx-text-color hx-text-[16px] hx-truncate">
              {{ item?.bankName }}
            </p>
            <p class="hx-text-color-main hx-text-[20px] hx-truncate">
              {{ handleGetBankNum(item?.bankAccount) }}
            </p>
          </view>
        </view>
      </template>
      <ProPlaceholder
        v-else
        type="noData"
        @refresh="handleGetPersonalCenterBankCard"
      />
    </view>
  </ProPage>
</template>

<script lang="ts" setup>
import { onPullDownRefresh } from '@dcloudio/uni-app';
import { onMounted, ref } from 'vue';

import { getPersonalCenterBankCard } from '@/api/fe/wechat/personal_center';
import { handleGetBankNum } from '@/utils/text';

const bankList = ref<Array<any>>([]);

onMounted(() => {
  handleGetPersonalCenterBankCard();
});
onPullDownRefresh(() => {
  handleGetPersonalCenterBankCard();
});
const handleGetPersonalCenterBankCard = () => {
  getPersonalCenterBankCard().then(res => {
    bankList.value = res;
    uni.stopPullDownRefresh();
  });
};
</script>

<style lang="scss" scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
