<template>
  <ProPage class="hx-flex hx-flex-col" navbar-title="实名认证" show-navbar>
    <view class="step-container page-pt-with-navbar hx-h-[170px]">
      <Steps :current="0" class="hx-mt-[7px]" />
    </view>

    <view class="hx-flex-1 hx-overflow-auto hx-pb-[48px]">
      <view
        v-if="applyStatusMap?.appealStatus !== APPLY_STATUS.PASSED"
        class="hx-p-[16px_20px_0_20px] hx-bg-white"
      >
        <text
          :class="[APPLY_STATUS_MAP[applyStatusMap.appealStatus]?.className]"
        >
          {{ applyTipText }}
        </text>
      </view>

      <ProForm
        ref="proFormRef"
        :model="formData"
        :rules="formRules"
        :disabled="nextDisabled"
        border-bottom
        error-type="border-bottom"
        label-position="left"
        label-width="250rpx"
      >
        <view v-for="(item, index) in formItemGroups" :key="index">
          <view
            v-if="item.categoryCode === REAL_TYPE.ID_CARD"
            class="hx-p-[16px_20px] hx-bg-white hx-mb-[10px]"
          >
            <IDCardUpload v-model="formData" :readonly="nextDisabled" />
          </view>

          <view
            v-else-if="item.categoryCode === REAL_TYPE.CERTIFICATION_INFO"
            class="info-content"
          >
            <view class="section-title hx-mb-[6px]">
              {{ REAL_TYPE_MAP[item.categoryCode]?.label }}
            </view>
            <view
              class="hx-mb-[16px] hx-text-text-color-tip hx-text-font-size-base hx-font-[400] hx-leading-[18px]"
            >
              请上传png，jpg，jpeg格式，文件大小不超过5M
            </view>

            <view
              class="hx-flex hx-flex-col hx-items-center"
              v-for="(prop, index) in item.properties"
              :key="index"
            >
              <ProUpload
                class="hx-mb-[16px]"
                v-model="formData[prop.fieldCode]"
                :readonly="nextDisabled"
                :background-name="kebabCase(prop.fieldCode)"
                :upload-button-title="`点击上传${prop.labelName}`"
                :maxSize="5 * 1024 * 1024"
              />
            </view>
          </view>

          <view v-else class="info-content">
            <view class="section-title hx-mb-[16px]">
              {{ REAL_TYPE_MAP[item.categoryCode]?.label }}
            </view>

            <template v-for="(prop, index) in item.properties" :key="index">
              <ProFormItem
                :prop="prop.fieldCode"
                :label="prop.labelName"
                :required="prop.izRequired === YES_NO_TYPE.YES"
                border-bottom
              >
                <ProFormItemContent
                  v-model="formData[prop.fieldCode]"
                  mode="date"
                  input-align="right"
                  :readonly="nextDisabled"
                  :type="prop.valueType"
                  :options="[prop.dict]"
                  :placeholder="prop.labelName"
                />
              </ProFormItem>

              <!-- 手机号需要手机验证码 -->
              <ProFormItem
                v-if="prop.fieldCode === 'mobile'"
                required
                border-bottom
                prop="smsCode"
              >
                <template #label>
                  <ProCode
                    :fetch="
                      () => sms({ mobile: formData.mobile, type: 'normal' })
                    "
                    :valid-phone="validMobile"
                    :readonly="nextDisabled"
                  />
                </template>
                <ProInput
                  v-model="formData.smsCode"
                  type="number"
                  input-align="right"
                  placeholder="验证码"
                  :readonly="nextDisabled"
                />
              </ProFormItem>
            </template>
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
import { kebabCase } from 'lodash-es';
import { computed, onMounted, readonly, shallowRef } from 'vue';

import IDCardUpload from './components/IDCardUpload.vue';
import OperateTip from './components/OperateTip.vue';
import Steps from './components/Steps.vue';
import { useHandler } from './hooks/useHandler';

import { sms } from '@/api/system/sms';
import {
  APPLY_STATUS,
  APPLY_STATUS_MAP,
  REAL_TYPE,
  REAL_TYPE_MAP,
  YES_NO_TYPE
} from '@/constant/taskDetail';

const routeParams = shallowRef({
  sourceType: null,
  taskId: null,
  orderDetailId: null
});
onLoad(({ taskQueryParams = {} }) => {
  routeParams.value = JSON.parse(taskQueryParams);
});

const {
  handleNext,
  validMobile,
  handleGetRealNameInfo,

  proFormRef,
  formData,
  formRules,
  formItemGroups,

  applyStatusMap,
  applyTipText,

  explainModalRef,
  handleExplainConfirm
} = useHandler({
  routeParams
});

onMounted(() => {
  handleGetRealNameInfo();
});

const nextDisabled = computed(() => {
  return applyStatusMap.value.appealStatus === APPLY_STATUS.TO_BE_PROCESSED;
});
</script>

<style lang="scss" scoped>
.step-container {
  background-image: url($http + '/real-name/real-name-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.info-content {
  padding: 20px 16px;
  margin-bottom: 10px;
  background-color: #fff;
}
</style>
