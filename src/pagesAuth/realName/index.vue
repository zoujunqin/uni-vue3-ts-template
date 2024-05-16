<template>
  <ProPage
    class="hx-flex hx-flex-col"
    navbar-title="实名认证"
    show-navbar
    @pageBack="handlePageBack"
  >
    <view class="step-container page-pt-with-navbar hx-h-[170px]">
      <Steps :current="current" class="hx-mt-[7px]" />
    </view>

    <view class="hx-flex-1 hx-overflow-auto hx-pb-[54px]">
      <view v-if="current === 0">
        <ProForm
          ref="proFormRef"
          :model="formData"
          :rules="formRules"
          borderBottom
          error-type="border-bottom"
          label-position="left"
        >
          <view class="hx-p-[16px_20px] hx-bg-white hx-mb-[10px]">
            <text
              v-if="
                !!applyStatusMap.appealStatus &&
                applyStatusMap.appealStatus !== APPLY_STATUS.PASSED
              "
              :class="[
                APPLY_STATUS_MAP[applyStatusMap.appealStatus]?.className,
                'hx-mb-[16px]'
              ]"
            >
              {{ applyTipText }}
            </text>

            <IDCardUpload v-model="formData" />
          </view>
          <view v-for="(item, index) in dynamicState" :key="index">
            <view
              v-if="item.categoryCode === REAL_TYPE.BANK_INFO"
              class="info-content"
            >
              <BankInfoForm
                ref="bankInfoFormRef"
                v-model="formData"
                v-model:smsCode="smsCode"
                :dynamicStateForm="item.properties"
              />
            </view>
            <view
              v-if="item.categoryCode === REAL_TYPE.BASE_INFO"
              class="info-content"
            >
              <BaseInfoForm
                v-model="formData"
                :dynamicStateForm="item.properties"
              />
            </view>
            <view
              v-if="item.categoryCode === REAL_TYPE.CERTIFICATION_INFO"
              class="info-content"
            >
              <QualificationUpload
                v-model="formData"
                :dynamicStateForm="item.properties"
              />
            </view>
          </view>
        </ProForm>

        <ProPageFooter>
          <ProButton
            :disabled="nextDisabled"
            class="hx-w-full"
            type="primary"
            @click="handleNext"
          >
            完成认证（下一步）
          </ProButton>
        </ProPageFooter>
      </view>
      <view v-if="current === 1">
        <web-view :src="signUrl" />
      </view>
    </view>
  </ProPage>

  <OperateTip />

  <ProModal
    ref="explainModalRef"
    confirm-button-text="申述"
    content="您的身份证图片识别的姓名与身份证号与填写的不一致，请重新上传图片或进行申述处理?"
    title=""
    @confirm="handleExplainConfirm"
  />
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';

import BankInfoForm from './components/BankInfoForm.vue';
import BaseInfoForm from './components/BaseInfoForm.vue';
import IDCardUpload from './components/IDCardUpload.vue';
import OperateTip from './components/OperateTip.vue';
import QualificationUpload from './components/QualificationUpload.vue';
import Steps from './components/Steps.vue';
import { useHandler } from './hooks/useHandler';
import { useHandlerCode } from './hooks/useHandlerCode';

import {
  APPLY_STATUS,
  APPLY_STATUS_MAP,
  REAL_TYPE
} from '@/constant/taskDetail';

const bankInfoFormRef = ref();
const current = ref(0);
const infoParams = ref({
  sourceType: null,
  taskId: null,
  orderDetailId: null
});
const applyStatusMap = ref({
  appealStatus: '',
  rejectCause: ''
});
const signUrl = ref('');
const {
  formData,
  proFormRef,
  applyTipText,
  formRules,
  smsCode,
  explainModalRef,
  dynamicState,
  handleGetRealNameInfo,
  handleNext,
  handleExplainConfirm,
  handlePageBack
} = useHandler({
  infoParams,
  applyStatusMap,
  signUrl,
  current
});
const { handlePostWorkerProtocolSign } = useHandlerCode({
  infoParams,
  signUrl,
  current
});

onLoad(query => {
  const taskQueryParams = JSON.parse(query?.taskQueryParams);
  infoParams.value = {
    ...taskQueryParams
  };
  current.value = Number(taskQueryParams.current);
  if (current.value === 0) {
    handleGetRealNameInfo();
  } else if (current.value === 1) {
    handlePostWorkerProtocolSign();
  }
});
const nextDisabled = computed(() => {
  return applyStatusMap.value.appealStatus === APPLY_STATUS.TO_BE_PROCESSED;
});
</script>

<style lang="scss" scoped>
.step-container {
  background-image: url($http + '/real-name/real-name-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.info-content {
  padding: 20px 16px;
  margin-bottom: 10px;
  background-color: #fff;
}
</style>
