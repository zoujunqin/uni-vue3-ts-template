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
          class="hx-flex-col hx-bg-white hx-mb-[10px] hx-pl-[15px] hx-pt-[17px]"
        >
          <view class="hx-flex hx-items-center">
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
          <ProGap v-if="row?.insuranceName" height="1" bgColor="#F2F2F2" />
          <ProCollapse v-if="row?.content" :border="false">
            <ProCollapseItem title="查看详情内容">
              <text>{{ row?.content }}</text>
            </ProCollapseItem>
          </ProCollapse>
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
