<template>
  <view class="login hx-p-[128px_24px_0_24px] hx-h-full hx-flex hx-flex-col">
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

    <ProButton class="hx-mt-[56px]" type="success" text="微信授权登录" />
    <ProButton class="hx-mt-[18px]" type="primary" text="使用手机号码登录" />

    <view class="hx-mt-[24px] hx-flex hx-items-center hx-justify-center">
      <ProCheckboxGroup v-model="isAgree" class="!hx-flex-none">
        <ProCheckbox name="true" shape="circle" />
      </ProCheckboxGroup>
      <text
        class="hx-text-font-size-base hx-leading-[24px] hx-text-text-color-tip"
      >
        已阅读并同意
        <text class="hx-text-color-primary" @click="openPopup">
          《用户协议 》
        </text>
        和
        <text class="hx-text-color-primary" @click="openPopup">
          《隐私政策》
        </text>
      </text>
    </view>
  </view>

  <ProPopup round="10" closeable ref="proPopupRef" mode="bottom">
    <view class="hx-p-[18px_12px]">
      <view
        class="hx-mb-[24px] hx-text-center hx-text-color-title hx-text-font-size-lg hx-font-[400] hx-leading-[21px]"
      >
        用户协议及隐私政策
      </view>
      <view
        class="hx-text-font-size-base hx-text-text-color hx-font-[400] hx-leading-[21px]"
      >
        在您注册成为本平台用户时，您需要通过点击同意的形式阅读《用户协议》、《隐私政策》，请您务必仔细阅读、充分理解条款内容后再点击同意(尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限)
      </view>
      <view
        class="hx-text-font-size-base hx-text-text-color hx-font-[400] hx-leading-[21px]"
      >
        请您注意:如果您不同意上述服务条款、隐私政策或其中任何约定，请您停止注册。如您阅读并点击同意即表示您已充分阅读、理解并接受其全部内容，并表明您也同意本平台可以依据以上隐私政策来处理您的个人信息。如您对以上用户协议、隐私政策有任何疑问，您可联系平台客服。点击同意即表示您已阅读并同意本平台服务条款
      </view>
    </view>
  </ProPopup>
</template>
<script setup lang="ts">
import { shallowRef } from 'vue';

const isAgree = shallowRef([]);
const proPopupRef = shallowRef();
const openPopup = () => {
  proPopupRef.value.open();
};
</script>

<style scoped>
.login {
  background: linear-gradient(
    180deg,
    #fff 0%,
    #eef8ff 46.47%,
    #e8efff 73.17%,
    #e7e6fd 100%
  );
}
</style>
