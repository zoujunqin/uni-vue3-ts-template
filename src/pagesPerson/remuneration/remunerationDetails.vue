<template>
  <ProPage
    show-navbar
    navbar-title="收入明细"
    class="remunerationDetails-container hx-bg-[length:100%] hx-bg-no-repeat hx-px-[16px] hx-pt-[10px]"
    :style="`background-image: url(${import('@http/person/income-bg.svg')});`"
  >
    <view class="page-pt-with-navbar">
      <view class="monty-box">
        <view class="top-content">
          <image
            :src="import('@http/person/shield.svg')"
            class="hx-w-[18px] hx-h-[18px] hx-mr-[4px]"
          />
          <span>账户安全保障中</span>
        </view>
        <view class="footer-content">
          <view class="hx-ml-[16px]">
            <p class="hx-text-text-color-main hx-text-[32px] hx-font-semibold">
              {{ formData.finalPayingAmount.toFixed(2) }}
            </p>
            <span class="hx-text-text-color-tip hx-text-[14px]">收入金额</span>
          </view>
        </view>
        <image
          :src="import('@http/person/shield-big.png')"
          class="shieldBig-img"
        />
      </view>
      <view class="details-content">
        <p class="hx-text-text-color-main hx-text-[16px] hx-font-semibold">
          详细信息
        </p>
        <view
          v-for="item in formDataList"
          :key="item.key"
          class="hx-flex hx-mt-[12px]"
        >
          <view class="hx-w-[95px] hx-truncate hx-mr-[24px]">
            <span class="hx-text-text-color-tip hx-text-[14px]">
              {{ item.label }}
            </span>
          </view>
          <view class="hx-w-[195px] hx-truncate">
            <span class="hx-text-text-color-main hx-text-[14px]">
              {{ formData[item.key] }}
            </span>
          </view>
        </view>
      </view>
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

import { getPersonalCenterByIdIncome } from '@/api/fe/wechat/personal_center';
const formData = ref();
const formDataList = ref([
  {
    label: '姓名',
    key: 'workerName'
  },
  {
    label: '手机号',
    key: 'mobile'
  },
  {
    label: '发放月',
    key: 'salaryIssueMonth'
  },
  {
    label: '身份证号',
    key: 'idCardNo'
  }
]);
onLoad(query => {
  getPersonalCenterByIdIncome(query?.id).then(res => {
    const keyValue = res.dataList.map(item => [item.header, item.value]);
    const resultObj = Object.fromEntries(keyValue);
    formData.value = { ...res, ...resultObj };
    Object.keys(resultObj).reduce((result, item) => {
      result.push({ label: item, key: item });
      return result;
    }, formDataList.value);
  });
});
</script>

<style scoped lang="scss">
:deep(.pro-navbar) {
  background-color: #fff;
}

.remunerationDetails-container {
  .monty-box {
    position: relative;
    width: 343px;
    height: 138px;
    background: rgb(255 255 255 / 40%);
    border-radius: 12px;

    .top-content {
      position: absolute;
      top: 11px;
      left: 16px;
      display: flex;
      align-items: center;
    }

    .footer-content {
      position: absolute;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 343px;
      height: 96px;
      background-color: #fff;
      border-radius: 12px;
    }

    .shieldBig-img {
      position: absolute;
      top: 0;
      right: 0;
      width: 136px;
      height: 127px;
    }
  }

  .details-content {
    width: 343px;
    padding: 16px 12px 22px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
