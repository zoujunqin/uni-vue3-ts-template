<template>
  <ProPage
    class="login hx-p-[128px_24px_0_24px] hx-h-full hx-flex hx-flex-col"
    navbar-title=""
    show-navbar
  >
    <text
      class="hx-text-[26px] hx-leading-[30px] hx-font-[600] hx-text-color-title"
    >
      欢迎登录
    </text>
    <text
      class="hx-mt-[20px] hx-text-font-size-regular hx-text-text-color hx-font-[400] hx-leading-[16px]"
    >
      未注册的手机号将自动注册
    </text>

    <ProButton
      :class="[valid && '!hx-hidden']"
      :hairline="false"
      class="hx-text-[white] hx-mt-[56px] hx-bg-color-success hx-flex hx-items-center hx-justify-center hx-rounded-[6px]"
      type="success"
      @click="validate"
    >
      <text class="hx-text-[15px]"> 手机号快捷登录 </text>
    </ProButton>
    <ProButton
      :class="[!valid && '!hx-hidden']"
      :hairline="false"
      class="hx-text-[white] hx-mt-[56px] hx-bg-color-success hx-flex hx-items-center hx-justify-center hx-rounded-[6px]"
      open-type="getPhoneNumber"
      type="success"
      @getphonenumber="weChatAuthLogin"
    >
      <text class="hx-text-[15px]"> 手机号快捷登录 </text>
    </ProButton>

    <ProButton
      class="hx-text-[white] hx-mt-[18px] hx-bg-color-primary hx-flex hx-items-center hx-justify-center hx-rounded-[6px]"
      type="primary"
      @tap="navToMobileLogin"
    >
      <text class="hx-text-[15px]"> 手机号登录 </text>
    </ProButton>

    <view class="hx-mt-[24px] hx-flex hx-items-center hx-justify-center">
      <ProCheckboxGroup
        v-model="isAgree"
        class="!hx-flex-none hx-relative"
        @change="handleIsAgreeChange"
      >
        <ProCheckbox name="true" shape="circle" size="mini" />
        <ProTooltipPer ref="proTooltipPerRef" text="请阅读并勾选用户协议" />
      </ProCheckboxGroup>
      <text
        class="hx-text-font-size-base hx-leading-[24px] hx-text-text-color-tip"
      >
        已阅读并同意
        <text class="hx-text-color-primary"> 《用户协议》 </text>
        和
        <text class="hx-text-color-primary"> 《隐私政策》 </text>
      </text>
    </view>

    <ProButton @click="handleBack"> 后退 </ProButton>
  </ProPage>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';

import { weChatAuthLogin } from './login';

import { mobileLoginPagePath } from '@/constant/pagePath';
import { useRouter } from '@/router/router';

const isAgree = shallowRef([]);
const proTooltipPerRef = ref();
const valid = computed(() => isAgree.value.length === 1);

const navToMobileLogin = () => {
  if (!validate()) return;
  uni.navigateTo({
    url: mobileLoginPagePath
  });
};

const validate = () => {
  if (!valid.value) proTooltipPerRef.value.open();

  return valid.value;
};
const handleIsAgreeChange = () => {
  proTooltipPerRef.value.close();
};

const handleBack = () => {
  const { router } = useRouter();
  router.back();
};
</script>
