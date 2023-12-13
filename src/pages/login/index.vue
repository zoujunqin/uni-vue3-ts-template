<template>
  <view
    class="login hx-p-[128px_24px_0_24px] hx-h-full hx-flex hx-flex-col"
    @click="closeTooltip"
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
      type="success"
      open-type="getPhoneNumber"
      :hairline="false"
      class="hx-text-[white] hx-mt-[56px] hx-bg-color-success hx-h-[44px] hx-flex hx-items-center hx-justify-center hx-rounded-[6px]"
      @getphonenumber="getPhoneNumber"
    >
      <image
        src="@/static/login/weixin-white-icon.png"
        class="hx-w-[24px] hx-h-[24px] hx-mr-[2px]"
      />
      <text> 微信授权登录 </text>
    </ProButton>

    <ProButton
      type="primary"
      class="hx-text-[white] hx-mt-[18px] hx-bg-color-primary hx-h-[44px] hx-flex hx-items-center hx-justify-center hx-rounded-[6px]"
      @tap="navToMobileLogin"
    >
      <image
        src="@/static/login/phone-icon.png"
        class="hx-w-[24px] hx-h-[24px] hx-mr-[2px]"
      />
      <text> 使用手机号码登录 </text>
    </ProButton>

    <view class="hx-mt-[24px] hx-flex hx-items-center hx-justify-center">
      <ProCheckboxGroup v-model="isAgree" class="!hx-flex-none">
        <ProCheckbox name="true" shape="circle" size="mini" />
      </ProCheckboxGroup>
      <ProTooltip
        class="hx-pointer-events-none"
        ref="proTooltipRef"
        bg-color="transparent"
        :show-copy="false"
        :buttons="['请阅读并勾选用户协议']"
      />
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
import { computed, shallowRef } from 'vue';

const isAgree = shallowRef([]);
const proTooltipRef = shallowRef();
const valid = computed(() => isAgree.value.length === 1);

const proPopupRef = shallowRef();
const openPopup = () => {
  proPopupRef.value.open();
};

const getPhoneNumber = () => {};

// TODO:
// const handleWeXinLogin = () => {
//   if (!validate()) return;
//   uni.login().then(res => {
//     console.log(res);
//   });
// };

const navToMobileLogin = () => {
  if (!validate()) return;
  uni.navigateTo({ url: '/pages/login/mobileLogin' });
};

const validate = () => {
  if (!valid.value) proTooltipRef.value.open();

  return valid.value;
};

const closeTooltip = () => {
  !valid.value && proTooltipRef.value.close();
};
</script>

<style scoped lang="scss">
.login {
  background: linear-gradient(
    180deg,
    #fff 0%,
    #eef8ff 46.47%,
    #e8efff 73.17%,
    #e7e6fd 100%
  );
}

:deep(.uv-tooltip__wrapper__popup__list) {
  align-items: unset !important;
  justify-content: center;
  width: 154px;
  height: 42px;
  background-color: unset !important;
  background-image: url($http + '/login/login-tip-bg.png');
  background-repeat: no-repeat;
  background-position: -7px -5px;
  background-size: 169px 57px;
}

:deep(.uv-tooltip__wrapper__popup__list__btn) {
  display: unset !important;
  padding: 8px 0 0 !important;
}

:deep(.uv-tooltip__wrapper__popup__list__btn__text) {
  font-size: 13px !important;
  font-weight: 400 !important;
  line-height: 14px !important;
  color: var(--hx-text-color) !important;
}

:deep(.uv-tooltip__wrapper__popup__indicator) {
  background-color: unset !important;
}

:deep(.uv-button) {
  height: 100% !important;
}
</style>
