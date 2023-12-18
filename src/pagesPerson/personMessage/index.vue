<template>
  <ProPage
    show-navbar
    navbar-title="个人信息"
    class="personCenter-container page-pt-with-navbar hx-bg-white"
  >
    <view class="hx-bg-[--hx-bg-color-grey] hx-h-full hx-pt-[10px]">
      <view class="card-box">
        <view class="hx-flex hx-justify-between hx-mb-[12px]">
          <span class="title-tip"> 证件信息 </span>
          <span class="hx-text-color-success hx-text-[14px]">
            {{ personData.appealStatus }}
          </span>
        </view>
        <view class="hx-flex hx-justify-between">
          <view class="hx-flex hx-flex-col hx-items-center">
            <image
              class="hx-w-[170px] hx-h-[107px] hx-mb-[8px]"
              @tap="handleLookImg(0)"
              :src="
                personData.idCardFront || import('@http/person/card-front.svg')
              "
            />
            <span class="card-tip"> 证件信息面 </span>
          </view>
          <view class="hx-flex hx-flex-col hx-items-center">
            <image
              class="hx-w-[170px] hx-h-[107px] hx-mb-[8px]"
              @tap="handleLookImg(1)"
              :src="
                personData.idCardReverse ||
                import('@http/person/card-reverse.svg')
              "
            />
            <span class="card-tip"> 国徽面 </span>
          </view>
        </view>
      </view>
      <view class="card-box">
        <span class="title-tip"> 个人信息 </span>
        <view class="form-row">
          <span class="form-label">姓名</span>
          <span class="form-text">{{ personData.workerName }}</span>
        </view>
        <view class="form-row">
          <span class="form-label">身份证号</span>
          <span class="form-text">{{ personData.idCardNo }}</span>
        </view>
        <view class="form-row">
          <span class="form-label">手机号</span>
          <span class="form-text">{{ personData.mobile }}</span>
        </view>
      </view>
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';

import { getPersonalCenterInfo } from '@/api/fe/wechat';
import { useOss } from '@/hooks/useOss';

const { getPreviewUrl } = useOss();

const imageList = shallowRef<Array<string>>([]);

const personData = shallowRef({
  appealStatus: '',
  workerName: '',
  idCardNo: '',
  idCardFront: '',
  idCardReverse: '',
  mobile: ''
});

onMounted(() => {
  handleGetPersonalCenterInfo();
});

const handleGetPersonalCenterInfo = () => {
  getPersonalCenterInfo().then(async res => {
    personData.value = res;
    personData.value.idCardFront = res.idCardFront
      ? await getPreviewUrl(res.idCardFront)
      : '';
    personData.value.idCardReverse = res.idCardReverse
      ? await getPreviewUrl(res.idCardReverse)
      : '';
    imageList.value = [
      personData.value.idCardFront,
      personData.value.idCardReverse
    ];
  });
};

const handleLookImg = (index: number) => {
  uni.previewImage({
    current: index,
    urls: imageList.value
  });
};
</script>

<style scoped lang="scss">
.personCenter-container {
  .card-box {
    margin-bottom: 10px;
    padding: 16px 12px;
    background-color: var(--hx-bg-color);
  }
  .card-tip {
    font-size: 12px;
    color: var(--hx-text-color-regular);
  }
  .title-tip {
    color: var(--hx-text-color-main);
    font-size: 18px;
    font-weight: 500;
  }
  .form-row {
    display: flex;
    margin-top: 12px;
  }
  .form-label {
    display: block;
    width: 80px;
    font-size: 14px;
    color: var(--hx-text-color-tip);
  }
  .form-text {
    color: var(--hx-text-color-main);
    font-size: 14px;
  }
}
</style>
