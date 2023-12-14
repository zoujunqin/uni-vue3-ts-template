<template>
  <ProPage
    show-navbar
    navbar-title="银行卡"
    class="page-pt-with-navbar hx-bg-white"
  >
    <view
      class="hx-bg-[--hx-bg-color-grey] hx-h-full hx-px-[12px] hx-py-[10px]"
    >
      <template v-if="bankList.length > 0">
        <view
          v-for="(item, index) in bankList"
          :key="index"
          class="hx-flex hx-items-center hx-bg-white hx-mb-[10px] hx-pl-[15px] hx-py-[24px] hx-rounded-[14px]"
        >
          <image
            class="hx-w-[50px] hx-h-[50px] hx-mr-[10px]"
            :src="import('@http/person/card-icon.png')"
          />
          <view class="hx-w-[250px]">
            <p
              class="hx-text-color-[--hx-text-color] hx-text-font-size-regular hx-truncate"
            >
              {{ item?.bankName }}
            </p>
            <p
              class="hx-text-color-[--hx-text-color-main] hx-text-font-size-20 hx-truncate"
            >
              {{ handleGetBankNum(item?.bankAccount) }}
            </p>
          </view>
        </view>
      </template>
      <ProPlaceholder v-else type="noBankCard" />
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { getPersonalCenterBankCard } from '@/api/personCenter';
import { onMounted, shallowRef } from 'vue';
import { handleGetBankNum } from '@/utils/processingText';

const bankList = shallowRef<Array<any>>([]);

onMounted(() => {
  handleGetPersonalCenterBankCard();
});
const handleGetPersonalCenterBankCard = () => {
  getPersonalCenterBankCard().then(res => {
    bankList.value = res;
  });
};
</script>

<style></style>
