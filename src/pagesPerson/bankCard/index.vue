<template>
  <ProPage
    class="page-pt-with-navbar hx-flex hx-flex-col"
    navbar-title="银行卡"
    show-navbar
  >
    <ProScrollList
      ref="proScrollListRef"
      :fetch="getPersonalCenterBankCard"
      class="hx-h-full hx-py-[10px] hx-box-border hx-bg-bg-color-grey"
    >
      <template #default="{ row }">
        <view
          class="hx-flex hx-items-center hx-bg-white hx-mb-[10px] hx-mx-[12px] hx-py-[24px] hx-rounded-[14px]"
        >
          <image
            :src="import('@http/person/card-icon.svg')"
            class="hx-w-[50px] hx-h-[50px] hx-mr-[10px]"
          />
          <view class="hx-w-[250px]">
            <p class="hx-text-color hx-text-[16px] hx-truncate">
              {{ row?.bankName }}
            </p>
            <p class="hx-text-color-main hx-text-[20px] hx-truncate">
              {{ handleGetBankNum(row?.bankAccount) }}
            </p>
          </view>
        </view>
      </template>
    </ProScrollList>
  </ProPage>
</template>

<script lang="ts" setup>
import { getPersonalCenterBankCard } from '@/api/fe/wechat/personal_center';
import { handleGetBankNum } from '@/utils/text';
</script>

<style lang="scss" scoped>
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
