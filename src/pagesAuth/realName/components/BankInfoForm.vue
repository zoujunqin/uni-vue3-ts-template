<template>
  <view class="section-title hx-mb-[16px]"> 银行信息 </view>
  <view
    class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
  >
    身份证号以及银行卡号必须同属一个自然人
  </view>

  <view class="hx-flex hx-flex-col hx-items-center">
    <ProFormItem
      class="hx-w-full"
      label="银行卡"
      prop="name"
      label-width="250rpx"
    >
      <ProInput
        class="!hx-pr-0"
        v-model="data.name"
        input-align="right"
        placeholder="请输入收款银行卡"
      />
    </ProFormItem>

    <ProFormItem
      class="hx-w-full"
      label="所属银行"
      prop="sex"
      label-width="250rpx"
    >
      <ProInput
        class="!hx-pr-0"
        v-model="data.sex"
        placeholder="请输入所属银行"
        input-align="right"
      />
    </ProFormItem>

    <ProFormItem
      class="hx-w-full"
      label="银行卡预留电话"
      prop="sex"
      label-width="250rpx"
    >
      <ProInput
        class="!hx-pr-0"
        v-model="data.sex"
        placeholder="请输入预留电话"
        input-align="right"
      />
    </ProFormItem>

    <!-- 获取验证码 -->
    <view class="hx-w-full hx-flex hx-items-center">
      <view
        class="hx-text-left hx-w-[125px] hx-text-color-primary hx-text-font-size-base hx-font-[400] hx-leading-[21px]"
      >
        <text v-if="!captchaIsValid" @tap.stop="handleGetCaptcha">
          获取验证码
        </text>
        <view v-else class="hx-flex hx-items-center">
          <ProCountDown
            :time="60000"
            format="ss"
            class="count-down"
            @finish="handleFinish"
          />
          <text> s后失效 </text>
        </view>
      </view>
      <ProFormItem class="!hx-flex-1" prop="sex">
        <ProInput
          class="!hx-pr-0"
          v-model="data.sex"
          placeholder="请输入验证码"
          input-align="right"
        />
      </ProFormItem>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useVModel } from '@/hooks/useVModel';
import { shallowRef } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['update:formData']);

const data = useVModel(props, 'formData', emit);

const captchaIsValid = shallowRef(false);
const handleGetCaptcha = () => {
  captchaIsValid.value = true;
};
const handleFinish = () => {
  captchaIsValid.value = false;
};
</script>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
