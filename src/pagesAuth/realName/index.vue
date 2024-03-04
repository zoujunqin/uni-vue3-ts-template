<template>
  <ProPage
    show-navbar
    navbar-title="实名认证"
    class="hx-flex hx-flex-col"
    @pageBack="handlePageBack"
  >
    <view class="step-container page-pt-with-navbar hx-h-[170px]">
      <Steps class="hx-mt-[23px]" :current="current" />
    </view>

    <view class="hx-flex-1 hx-overflow-auto hx-pb-[54px]">
      <view v-if="current === 0">
        <ProForm
          ref="proFormRef"
          borderBottom
          label-position="left"
          error-type="border-bottom"
          :model="formData"
          :rules="formRules"
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
              class="info-content"
              v-if="item.categoryCode === REAL_TYPE.BANK_INFO"
            >
              <BankInfoForm
                :dynamicStateForm="item.properties"
                v-model="formData"
                v-model:smsCode="smsCode"
                ref="bankInfoFormRef"
              />
            </view>
            <view
              class="info-content"
              v-if="item.categoryCode === REAL_TYPE.BASE_INFO"
            >
              <BaseInfoForm
                :dynamicStateForm="item.properties"
                v-model="formData"
              />
            </view>
            <view
              class="info-content"
              v-if="item.categoryCode === REAL_TYPE.CERTIFICATION_INFO"
            >
              <QualificationUpload
                :dynamicStateForm="item.properties"
                v-model="formData"
              />
            </view>
          </view>
        </ProForm>

        <ProPageFooter>
          <ProButton class="hx-w-full" type="primary" @tap.stop="handleNext">
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
    title=""
    content="您的身份证图片识别不通过，请重新上传或进行申述处理?"
    confirm-button-text="申述"
    @confirm="handleExplainConfirm"
  />
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

import BankInfoForm from './components/BankInfoForm.vue';
import BaseInfoForm from './components/BaseInfoForm.vue';
import IDCardUpload from './components/IDCardUpload.vue';
import OperateTip from './components/OperateTip.vue';
import QualificationUpload from './components/QualificationUpload.vue';
import Steps from './components/Steps.vue';
import { useHandler } from './hooks/useHandler';
import { useHandlerCode } from './hooks/useHandlerCode';

import {
  APPLY_STATUS_MAP,
  APPLY_STATUS,
  REAL_TYPE
} from '@/constant/taskDetail';
import { getInvitationCodeId } from '@/utils/user';

const bankInfoFormRef = ref();
const current = ref(0);
const infoParams = ref({ invitationCodeId: null, taskId: null });
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
  signUrl
});
const { handleGetTaskSignUrl, handleGetCodeSignUrl } = useHandlerCode({
  infoParams,
  signUrl
});
onLoad(query => {
  infoParams.value = {
    invitationCodeId:
      getInvitationCodeId() === '-1' ? '' : getInvitationCodeId(),
    taskId: query.taskId ? query.taskId : ''
  };
  current.value = Number(query?.current);
  if (current.value === 0) {
    handleGetRealNameInfo();
  } else if (current.value === 1) {
    if (getInvitationCodeId() === '-1') {
      handleGetTaskSignUrl();
    } else {
      handleGetCodeSignUrl();
    }
  }
});
</script>

<style scoped lang="scss">
.step-container {
  background-image: url($http + '/real-name/real-name-bg.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.info-content {
  padding: 20px 16px;
  background-color: #fff;
  margin-bottom: 10px;
}
</style>
