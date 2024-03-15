<template>
  <view class="section-title hx-mb-[16px]"> 银行信息 </view>
  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    身份证号以及银行卡号必须同属一个自然人
  </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <template v-for="item in dynamicStateForm" :key="item.fieldCode">
      <ProFormItem
        borderBottom
        :required="item.izRequired === 'yes'"
        class="hx-w-full"
        :label="item.labelName"
        :prop="item.fieldCode"
        label-width="250rpx"
      >
        <ProInput
          v-if="item.valueType === 'text'"
          class="!hx-pr-0"
          v-model="data[item.fieldCode]"
          input-align="right"
          :placeholder="item?.labelName"
        />
        <ProInput
          v-if="item.valueType === 'number'"
          type="number"
          class="!hx-pr-0"
          v-model="data[item.fieldCode]"
          input-align="right"
          :placeholder="item?.labelName"
        />
      </ProFormItem>
      <!-- 获取验证码 -->
      <view
        class="hx-w-full hx-flex hx-items-center"
        v-if="item.fieldCode === 'mobile'"
      >
        <view
          class="hx-text-left hx-w-[125px] hx-text-color-primary hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
        >
          <text v-if="!captchaIsValid" @tap.stop="handleGetCaptcha">
            获取验证码
          </text>
          <view v-else class="hx-flex hx-items-center">
            <ProCountDown
              :time="countTime * 1000"
              format="ss"
              class="count-down"
              @finish="handleFinish"
            />
            <text> s后失效 </text>
          </view>
        </view>
        <ProFormItem class="!hx-flex-1" prop="code">
          <ProInput
            class="!hx-pr-0"
            v-model="code"
            type="number"
            placeholder="请输入验证码"
            input-align="right"
          />
        </ProFormItem>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import { sms } from '@/api/system/sms';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  dynamicStateForm: {
    type: Array<any>,
    default: () => []
  },
  smsCode: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:smsCode']);
const code = useVModel(props, 'smsCode', emit);
const countTime = ref(60);

const data = useVModel(props, 'modelValue', undefined, {
  passive: true
});

const captchaIsValid = shallowRef(false);
const handleGetCaptcha = () => {
  const { mobile } = data.value;
  if (!mobile) return uni.showToast({ title: '请输入手机号码', icon: 'none' });
  const param = { mobile, type: 'normal' };
  sms(param).then(() => {
    uni.showToast({ title: '验证码获取成功', icon: 'none' });
    captchaIsValid.value = true;
  });
};
const handleFinish = () => {
  captchaIsValid.value = false;
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
