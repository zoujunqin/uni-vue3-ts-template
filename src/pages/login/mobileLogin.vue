<template>
  <ProPage
    show-navbar
    navbar-title=""
    class="login hx-p-[128px_24px_0_24px] hx-h-full hx-flex hx-flex-col"
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
      error-type="border-bottom"
      class="hx-mt-[24px]"
    >
      <ProFormItem prop="mobile">
        <ProInput
          v-model="formData.mobile"
          clearable
          placeholder="输入手机号"
          class="hx-bg-white hx-h-[44px] !hx-flex-none"
        />
      </ProFormItem>
      <ProFormItem prop="captcha">
        <ProInput
          v-model="formData.captcha"
          clearable
          placeholder="输入验证码"
          class="hx-bg-white hx-h-[44px] !hx-flex-none"
        >
          <template #suffix>
            <view class="hx-w-[84px] hx-flex hx-items-center">
              <view
                class="hx-mr-[12px] hx-w-[2px] hx-h-[16px] hx-bg-[#f2f2f2]"
              />
              <text
                v-if="!captchaIsValid"
                class="hx-text-color-primary hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
                @click="fetchCaptcha"
              >
                获取验证码
              </text>
              <view v-else class="hx-flex hx-items-center hx-justify-center">
                <ProCountDown
                  :time="60000"
                  format="ss"
                  class="hx-font-[400] hx-leading-[21px]"
                  @finish="handleFinish"
                />
                <text
                  class="hx-text-color-primary hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
                >
                  s后失效
                </text>
              </view>
            </view>
          </template>
        </ProInput>
      </ProFormItem>
    </ProForm>

    <ProButton class="hx-mt-[40px]" type="primary" @click="fetchMobileLogin">
      立即登录
    </ProButton>

    <view
      class="hx-flex hx-items-center hx-justify-center hx-mt-[24px] hx-text-text-color-tip"
    >
      <image
        src="@/static/login/weixin-gray-icon.png"
        class="hx-w-[24px] hx-h-[24px] hx-mr-[4px]"
      />
      <text class="hx-text-[15px] hx-font-[400] hx-leading-[24px]">
        微信授权登录
      </text>
    </view>
  </ProPage>
</template>

<script setup lang="ts">
import { loginWithSms } from '@/api/fe/wechat';
import { sms } from '@/api/system/sms';
import { ref, shallowRef } from 'vue';
import { useUserStore } from '@/pinia/modules/user';

const proFormRef = shallowRef();
const formData = ref({
  /* TODO: 写死测试。 验证码接口没开，先使用手机号后6位 */
  mobile: '18650209502',
  captcha: '209502'
});
const formRules = {
  mobile: {
    type: 'string',
    required: true,
    message: '请输入手机号',
    trigger: ['blur', 'change']
  },
  captcha: {
    type: 'string',
    required: true,
    message: '请输入验证码',
    trigger: ['blur', 'change']
  }
};

const captchaIsValid = shallowRef(false);

/* 获取验证码 */
const fetchCaptcha = () => {
  const { mobile } = formData.value;
  if (!mobile) return uni.showToast({ title: '请输入手机号码', icon: 'none' });

  const param = { mobile, type: 'fe_login' };
  sms(param).then(() => {
    uni.showToast({ title: '获取验证码成功', icon: 'none' });
    captchaIsValid.value = true;
  });
};

/* 验证码过期 */
const handleFinish = () => {
  captchaIsValid.value = false;
};

/* 调用登录接口 */
const fetchMobileLogin = () => {
  proFormRef.value.validate().then((valid: boolean) => {
    if (valid) {
      const { mobile, captcha } = formData.value;
      const param = { mobile, smsCode: captcha };
      loginWithSms(param).then(res => {
        useUserStore().setToken(res.token);
        uni.switchTab({ url: '/pages/taskCenter/index' });
      });
    }
  });
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

:deep(.pro-count-down text) {
  font-size: var(--hx-font-size-base) !important;
  color: var(--hx-color-primary) !important;
}
</style>
