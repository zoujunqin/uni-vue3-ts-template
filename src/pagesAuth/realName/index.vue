<template>
  <ProPage show-navbar navbar-title="实名认证" class="hx-flex hx-flex-col">
    <view class="step-container page-pt-with-navbar hx-h-[170px]">
      <Steps class="hx-mt-[23px]" current="0" />
    </view>

    <view class="hx-flex-1 hx-overflow-auto hx-pb-[54px]">
      <ProForm
        ref="proFormRef"
        label-position="left"
        error-type="none"
        :model="formData"
        :rules="formRules"
      >
        <view class="hx-p-[16px_20px] hx-bg-white hx-mb-[10px]">
          <text :class="fixedTipClass" class="hx-mb-[16px]">
            申诉失败：原因(列如申诉失败:照片不够清晰)
          </text>

          <IDCardUpload />
        </view>

        <view class="hx-p-[16px_20px] hx-bg-white hx-mb-[10px]">
          <BaseInfoForm />
        </view>

        <view class="hx-p-[16px_20px] hx-bg-white hx-mb-[10px]">
          <BankInfoForm />
        </view>

        <view class="hx-p-[16px_20px] hx-bg-white">
          <QualificationUpload />
        </view>
      </ProForm>
    </view>

    <ProPageFooter>
      <ProButton class="hx-w-full" type="primary" @tap.stop="handleNext">
        完成认证（下一步）
      </ProButton>
    </ProPageFooter>
  </ProPage>

  <OperateTip />
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';

import BankInfoForm from './components/BankInfoForm.vue';
import BaseInfoForm from './components/BaseInfoForm.vue';
import IDCardUpload from './components/IDCardUpload.vue';
import OperateTip from './components/OperateTip.vue';
import QualificationUpload from './components/QualificationUpload.vue';
import Steps from './components/Steps.vue';

const fixedTipClass = 'error-fixed-tip';

const proFormRef = shallowRef();
const formData = ref({
  name: '',
  sex: ''
});
const formRules = {
  name: {
    type: 'string',
    required: true,
    trigger: ['blur']
  },
  sex: {
    type: 'string',
    required: true,
    trigger: ['blur']
  }
};

const handleNext = () => {
  proFormRef.value.validate().then(res => {
    console.log(res);
  });
};
</script>

<style scoped lang="scss">
.step-container {
  background-image: url($http + '/real-name/real-name-bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
</style>
