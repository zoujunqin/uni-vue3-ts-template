<template>
  <ProPage
    show-navbar
    navbar-title="我的商保"
    class="page-pt-with-navbar hx-flex hx-flex-col"
  >
    <ProScrollList
      ref="proScrollListRef"
      :fetch="getPersonalCenterInsurance"
      class="hx-h-full hx-pb-[10px] hx-pt-[10px] hx-box-border hx-bg-bg-color-grey"
    >
      <template #default="{ row }">
        <view
          class="hx-flex hx-items-center hx-bg-white hx-mb-[10px] hx-pl-[15px] hx-py-[17px]"
        >
          <image
            class="hx-w-[50px] hx-h-[50px] hx-mr-[12px]"
            :src="import('@http/person/insurance-icon.svg')"
          />
          <view class="hx-w-[250px]">
            <p class="hx-text-text-color hx-text-[16px] hx-truncate">
              {{ row?.insuranceName }}
            </p>
          </view>
        </view>
      </template>
    </ProScrollList>
  </ProPage>
</template>

<script setup lang="ts">
import { getPersonalCenterInsurance } from '@/api/fe/wechat/personal_center';
</script>

<style scoped lang="scss">
:deep(.pro-navbar) {
  background-color: #fff;
}
</style>
