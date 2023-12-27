<template>
  <ProPage
    show-navbar
    navbar-title="收入明细"
    class="remunerationDetails-container hx-bg-no-repeat hx-px-[16px] hx-pt-[10px]"
    :style="`background-image: url(${import('@http/person/income-bg.svg')});`"
  >
    <view class="content-box">
      <view class="monty-box page-pt-with-navbar">
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
          :src="import('@http/person/shield-big.svg')"
          class="shieldBig-img"
        />
      </view>
      <view class="details-content">
        <view class="hx-mx-[16px] hx-mt-[16px] hx-mb-[22px]">
          <p class="hx-text-text-color-main hx-text-[18px] hx-font-semibold">
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
    formData.value = { ...res, ...res.extJsonMap };
    let dataObj = {};
    Object.keys(res.extJsonMap).forEach(item => {
      dataObj = {
        label: item,
        key: item
      };
      formDataList.value.push(dataObj);
    });
  });
});
</script>

<style scoped lang="scss">
.remunerationDetails-container {
  .content-box {
    position: relative;
    top: 104px;
  }
  .monty-box {
    position: absolute;
    height: 138px;
    width: 343px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.4);
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
      background-color: #fff;
      height: 96px;
      width: 343px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .shieldBig-img {
      position: absolute;
      width: 136px;
      height: 127px;
      right: 0;
      top: 0;
    }
  }
  .details-content {
    position: absolute;
    top: 148px;
    width: 343px;
    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
