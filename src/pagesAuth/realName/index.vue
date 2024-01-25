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

    <view v-if="current === 0">
      <view class="hx-flex-1 hx-overflow-auto hx-pb-[54px]">
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
            <view class="info-content" v-if="item.categoryCode === 'bank_info'">
              <BankInfoForm
                :dynamicStateForm="item.properties"
                v-model="formData"
                v-model:smsCode="smsCode"
                ref="bankInfoFormRef"
              />
            </view>
            <view class="info-content" v-if="item.categoryCode === 'base_info'">
              <BaseInfoForm
                :dynamicStateForm="item.properties"
                v-model="formData"
              />
            </view>
            <view
              class="info-content"
              v-if="item.categoryCode === 'certification_info'"
            >
              <QualificationUpload
                :dynamicStateForm="item.properties"
                v-model="formData"
              />
            </view>
          </view>
        </ProForm>
      </view>

      <ProPageFooter>
        <ProButton class="hx-w-full" type="primary" @tap.stop="handleNext">
          完成认证（下一步）
        </ProButton>
      </ProPageFooter>
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
import { computed, provide, ref } from 'vue';

import BankInfoForm from './components/BankInfoForm.vue';
import BaseInfoForm from './components/BaseInfoForm.vue';
import IDCardUpload from './components/IDCardUpload.vue';
import OperateTip from './components/OperateTip.vue';
import QualificationUpload from './components/QualificationUpload.vue';
import Steps from './components/Steps.vue';

import { applyTask } from '@/api/fe/wechat/task';
import {
  getRealNameInfo,
  realNameAuth,
  postAppealSubmit
} from '@/api/fe/wechat/worker';
import { getAreaListByDistrictId } from '@/api/system/area';
import { APPLY_STATUS_MAP, APPLY_STATUS } from '@/constant/taskDetail';
import { getRealName, setRealName } from '@/utils/user';

const proFormRef = ref();
const bankInfoFormRef = ref();
const formData = ref<any>({});

const formRules = ref({});
const dynamicState = ref();
const smsCode = ref('');
const invitationCodeId = ref(21);
const infoParams = ref({ invitationCodeId: null, taskId: null });
const explainModalRef = ref();
const current = ref(0);
const applyStatusMap = ref({
  appealStatus: '',
  rejectCause: ''
});

onLoad(query => {
  infoParams.value = {
    invitationCodeId: invitationCodeId.value,
    taskId: Number(query?.id)
  };
  current.value = Number(query?.current);
  handleGetRealNameInfo();
});
const localFormData = getRealName() ? getRealName() : {};
const localBool = Object.keys(localFormData).length > 0 ? true : false;

const handlePageBack = () => {
  setRealName(formData.value);
};
// provide('pageBack', { handlePageBack });

const handleGetRealNameInfo = () => {
  getRealNameInfo(infoParams.value).then(res => {
    applyStatusMap.value = {
      appealStatus: res.appealStatus,
      rejectCause: res.rejectCause
    };
    dynamicState.value = res.propertyGroups.reduce((arr, item) => {
      const newProperties = item.properties.reduce((subArr, subItem) => {
        getFormDataRules(subItem);
        if (
          subItem.fieldCode !== 'idCardFront' &&
          subItem.fieldCode !== 'idCardReverse'
        ) {
          subArr.push(subItem);
        }
        return subArr;
      }, []);
      arr.push({
        ...item,
        properties: newProperties
      });
      return arr;
    }, []);
    proFormRef.value.setRules(formRules.value);
  });
};
const applyTipText = computed(() => {
  return applyStatusMap.value['appealStatus'] === APPLY_STATUS.REJECT
    ? `申诉失败：原因(${applyStatusMap.value.rejectCause})`
    : '申述中：正在申述请耐心等待～';
});

const getFormDataRules = subItem => {
  formData.value[subItem.fieldCode] = subItem.value
    ? subItem.value
    : localBool
      ? localFormData[subItem.fieldCode]
      : '';
  formData.value['ocrSure'] = {
    front: false,
    reverse: false,
    areaText: '',
    areaCode: []
  };
  const rule = {
    type: 'string',
    required: subItem.izRequired === 'yes',
    trigger: ['blur', 'change']
  };
  formRules.value[subItem.fieldCode] = rule;
  if (subItem.fieldCode === 'domicileAreaCode' && subItem.value) {
    getAreaListByDistrictId({ districtId: subItem.value }).then(res => {
      formData.value['ocrSure'].areaCode = [
        res['left'].id,
        res['middle'].id,
        res['right'].id
      ];
      formData.value['ocrSure'].areaText =
        res['left'].name + '/' + res['middle'].name + '/' + res['right'].name;
    });
  }
};

const handleNext = async () => {
  if (!formData.value['idCardFront'] || !formData.value['idCardReverse']) {
    return uni.showToast({
      title: '请先上传身份证',
      icon: 'none'
    });
  }
  await proFormRef.value.validate();
  if (!smsCode.value) {
    return uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    });
  }
  const fIndex = dynamicState.value.findIndex(
    item => item.categoryCode === 'certification_info'
  );
  if (fIndex !== -1) {
    const findObj = dynamicState.value[fIndex].properties.find(item => {
      return item.izRequired === 'yes' && !formData.value[item.fieldCode];
    });
    if (findObj) {
      return uni.showToast({
        title: `请上传${findObj.labelName}`,
        icon: 'none'
      });
    }
  }
  const { front, reverse } = formData.value['ocrSure'];

  if (front && reverse) {
    handleRealNameAuth();
  } else {
    explainModalRef.value.open();
  }
};
const handleRealNameAuth = async () => {
  const keyList = Object.keys(formData.value);
  const properties = [];
  keyList.forEach(item => {
    if (item !== 'ocrSure') {
      properties.push({
        fieldCode: item,
        value: formData.value[item]
      });
    }
  });
  const params = {
    ...infoParams.value,
    properties: properties,
    smsCode: smsCode.value
  };
  realNameAuth(params).then(() => {
    handlePageBack();
    handleApplyTask();
  });
};

const handleExplainConfirm = () => {
  const {
    idCardNo,
    idCardReverse,
    idCardFront,
    bankAccount,
    workerName,
    mobile,
    bankName
  } = formData.value;
  const params = {
    idCardNo,
    idCardReverse,
    idCardFront,
    bankAccount,
    workerName,
    mobile,
    bankName
  };
  postAppealSubmit(params).then(() => {
    uni.showToast({ title: '申述成功，请耐心等待', icon: 'none' });
    uni.navigateBack();
  });
};
const handleApplyTask = () => {
  const { taskId } = infoParams.value;
  applyTask(taskId).then(res => {
    const {
      izRealname: izName,
      izSignProtocol: izSign,
      izFaceAuthenticated: izFace
    } = res;
    const current =
      izName === 'no' ? 0 : izSign === 'no' ? 1 : izFace === 'no' ? 2 : -1;
    // TODO 三方对接
    if (current === 1) {
      console.log('进入合同签署');
    } else {
      console.log('进入活体认证');
    }
  });
};
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
