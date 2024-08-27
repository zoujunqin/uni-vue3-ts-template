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
        <text class="hx-text-color-primary" @click="openPopup">
          《用户协议》
        </text>
        和
        <text class="hx-text-color-primary" @click="openPopup">
          《隐私政策》
        </text>
      </text>
    </view>
  </ProPage>

  <ProPopup ref="proPopupRef" closeable mode="bottom" round="10">
    <view class="hx-p-[18px_12px]">
      <view
        class="hx-mb-[24px] hx-text-center hx-text-color-title hx-text-font-size-lg hx-font-[400] hx-leading-[21px]"
      >
        用户协议及隐私政策
      </view>
      <view
        class="hx-text-font-size-base hx-text-text-color hx-font-[400] hx-leading-[21px]"
      >
        &emsp;&emsp;在您注册成为本平台用户时，您需要通过点击同意的形式阅读《用户协议》、《隐私政策》，请您务必仔细阅读、充分理解条款内容后再点击同意(尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限).
      </view>
      <view
        class="hx-text-font-size-base hx-text-text-color hx-font-[400] hx-leading-[21px]"
      >
        &emsp;&emsp;请您注意:
        如果您不同意上述服务条款、隐私政策或其中任何约定，请您停止注册。如您阅读并点击同意即表示您已充分阅读、理解并接受其全部内容，并表明您也同意本平台可以依据以上隐私政策来处理您的个人信息。如您对以上用户协议、隐私政策有任何疑问，您可联系平台客服。点击同意即表示您已阅读并同意本平台服务条款.
      </view>
    </view>
  </ProPopup>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';

import { weChatAuthLogin } from './login';

import { mobileLoginPagePath } from '@/constant/pagePath';

const isAgree = shallowRef([]);
const proTooltipPerRef = ref();
const valid = computed(() => isAgree.value.length === 1);

const proPopupRef = shallowRef();
const openPopup = () => {
  proPopupRef.value.open();
};

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
</script>
