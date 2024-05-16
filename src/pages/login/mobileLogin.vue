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

    <ProForm
      ref="proFormRef"
      :model="formData"
      :rules="formRules"
      class="hx-mt-[24px]"
      error-type="toast"
    >
      <ProFormItem prop="mobile">
        <ProInput
          v-model="formData.mobile"
          class="hx-bg-white hx-h-[44px] !hx-flex-none"
          clearable
          placeholder="输入手机号"
          type="number"
        />
      </ProFormItem>
      <ProFormItem prop="captcha">
        <ProInput
          v-model="formData.captcha"
          class="hx-bg-white hx-h-[44px] !hx-flex-none"
          clearable
          placeholder="输入验证码"
          type="number"
        >
          <template #suffix>
            <view class="hx-min-w-[84px] hx-flex hx-items-center">
              <view
                class="hx-mr-[12px] hx-w-[2px] hx-h-[16px] hx-bg-[#f2f2f2]"
              />
              <ProCode
                :fetch="fetchCaptcha"
                :valid-phone="validMobile"
                ref="proCodeRef"
                change-text="xs重新获取"
                end-text="获取验证码"
                text-class="hx-text-color-primary hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
              />
            </view>
          </template>
        </ProInput>
      </ProFormItem>
    </ProForm>

    <ProButton class="hx-mt-[40px]" type="primary" @click="fetchMobileLogin">
      <text class="hx-text-[15px]">立即登录</text>
    </ProButton>

    <ProButton
      :hairline="false"
      class="login-with-wechat hx-mt-[24px]"
      hover-start-time="50000"
      open-type="getPhoneNumber"
      @getphonenumber="weChatAuthLogin"
    >
      <text
        class="hx-text-[15px] hx-font-[400] hx-leading-[24px] hx-text-text-color-tip"
      >
        微信授权登录
      </text>
    </ProButton>
  </ProPage>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';

import { mobileLogin, weChatAuthLogin } from './login';

import { sms } from '@/api/system/sms';
import { mobileValidator } from '@/utils/formValidator';

const proFormRef = shallowRef();
const formData = ref({
  mobile: '',
  captcha: ''
});
const formRules = {
  mobile: [
    {
      type: 'string',
      required: true,
      message: '请输入手机号',
      trigger: ['blur', 'change']
    },
    {
      validator: mobileValidator,
      message: '手机号码错误'
    }
  ],
  captcha: {
    type: 'string',
    required: true,
    message: '请输入验证码',
    trigger: ['blur', 'change']
  }
};

const validMobile = () => {
  const { mobile } = formData.value;
  if (!mobile) return uni.showToast({ title: '请输入手机号码', icon: 'none' });
  return !!mobile;
};

const proCodeRef = shallowRef();
/* 获取验证码 */
const fetchCaptcha = () => {
  const { mobile } = formData.value;
  const param = { mobile, type: 'fe_login' };

  return sms(param)
    .then(() => {
      uni.showToast({ title: '验证码获取成功', icon: 'none' });
    })
    .finally(() => {
      proCodeRef.value.reset();
    });
};

/* 调用登录接口 */
const fetchMobileLogin = async () => {
  await proFormRef.value.validate();
  const { mobile, captcha } = formData.value;
  const param = { mobile, smsCode: captcha };
  mobileLogin(param);
};
</script>

<style lang="scss" scoped>
.login {
  background: linear-gradient(
    180deg,
    #fff 0%,
    #eef8ff 46.47%,
    #e8efff 73.17%,
    #e7e6fd 100%
  );
}

:deep(.pro-count-down text) {
  font-size: var(--hx-font-size-base) !important;
  color: var(--hx-color-primary) !important;
}

.login-with-wechat {
  :deep(button) {
    background-color: unset;
    border-color: transparent;
  }
}
</style>
