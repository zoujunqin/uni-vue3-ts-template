<template>
  <ProPage class="login p-[128px_24px_0_24px] h-full flex flex-col">
    <text class="text-[26px] leading-[30px] font-[600] text-color-title">
      欢迎登录
    </text>
    <text
      class="mt-[20px] text-font-size-regular text-text-color font-[400] leading-[16px]"
    >
      未注册的手机号将自动注册
    </text>

    <ProButton
      :class="[valid && '!hidden']"
      :hairline="false"
      class="text-[white] mt-[56px] bg-color-success flex items-center justify-center rounded-[6px]"
      type="success"
      @click="validate"
    >
      <text class="text-[15px]"> 手机号快捷登录 </text>
    </ProButton>
    <ProButton
      :class="[!valid && '!hidden']"
      :hairline="false"
      class="text-[white] mt-[56px] bg-color-success flex items-center justify-center rounded-[6px]"
      open-type="getPhoneNumber"
      type="success"
      @getphonenumber="weChatAuthLogin"
    >
      <text class="text-[15px]"> 手机号快捷登录 </text>
    </ProButton>

    <ProButton
      class="text-[white] mt-[18px] bg-color-primary flex items-center justify-center rounded-[6px]"
      type="primary"
      @tap="navToMobileLogin"
    >
      <text class="text-[15px]"> 手机号登录 </text>
    </ProButton>

    <view class="mt-[24px] flex items-center justify-center">
      <ProCheckboxGroup
        v-model="isAgree"
        class="!flex-none relative"
        @change="handleIsAgreeChange"
      >
        <ProCheckbox name="true" shape="circle" size="mini" />
        <ProTooltipPer ref="proTooltipPerRef" text="请阅读并勾选用户协议" />
      </ProCheckboxGroup>
      <text class="text-font-size-base leading-[24px] text-text-color-tip">
        已阅读并同意
        <text class="text-color-primary"> 《用户协议》 </text>
        和
        <text class="text-color-primary"> 《隐私政策》 </text>
      </text>
    </view>

    <ProButton @click="handleBack"> 后退 </ProButton>
  </ProPage>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, shallowRef } from 'vue';

import { weChatAuthLogin } from './login';

import { useRouter } from '@/router/router';

const router = useRouter();

const isAgree = shallowRef([]);
const proTooltipPerRef = ref();
const valid = computed(() => isAgree.value.length === 1);

const navToMobileLogin = () => {
  if (!validate()) return;
  router.push({ name: 'MobileLogin' });
};

const validate = () => {
  if (!valid.value) proTooltipPerRef.value.open();

  return valid.value;
};
const handleIsAgreeChange = () => {
  proTooltipPerRef.value.close();
};

const handleBack = () => {
  router.back();
};

onMounted(() => {
  console.log(getCurrentPages());
});
</script>
