import { debounce } from 'lodash-es';
import { computed, ref } from 'vue';

import { useHandlerCode } from './useHandlerCode';

import {
  getRealNameInfo,
  postAppealSubmit,
  realNameAuth
} from '@/api/fe/wechat/worker';
import { getOcrIdCard } from '@/api/system/ocr';
import { APPLY_STATUS, REAL_TYPE, YES_NO_TYPE } from '@/constant/taskDetail';
import { useOss } from '@/hooks/useOss';
import { useUserStore } from '@/pinia/modules/user';
import {
  getIdCardMessage,
  getRealName,
  setIdCardMessage,
  setRealName
} from '@/utils/storage';

export const useHandler = ({
  infoParams,
  applyStatusMap,
  signUrl,
  current
}) => {
  const { handleApplyTask, handleGetInvitationCodeScan } = useHandlerCode({
    infoParams,
    signUrl,
    current
  });
  const { getPreviewUrl } = useOss();
  const formData = ref<any>({});
  const proFormRef = ref();
  const dynamicState = ref();
  const formRules = ref({});
  const smsCode = ref('');
  const explainModalRef = ref();
  const localFormData = getRealName() || {};
  const localBool = Object.keys(localFormData).length > 0;

  const handleGetRealNameInfo = () => {
    getRealNameInfo(infoParams.value).then(async res => {
      applyStatusMap.value = {
        appealStatus: res.appealStatus,
        rejectCause: res.rejectCause
      };
      const newDynamicState = [];
      for (const key in res.propertyGroups) {
        const { properties, ...arg } = res.propertyGroups[key];
        newDynamicState.push({ ...arg });
        for (const subItem of properties) {
          if (!['idCardFront', 'idCardReverse'].includes(subItem.fieldCode)) {
            getFormData(subItem);
            getFormDataRules(subItem);
            newDynamicState[key].properties =
              newDynamicState[key].properties || [];
            newDynamicState[key].properties.push(subItem);
          } else {
            formData.value[subItem.fieldCode] = localBool
              ? localFormData[subItem.fieldCode]
              : subItem.value;
          }
        }
      }
      dynamicState.value = newDynamicState;
      proFormRef.value.setRules(formRules.value);
    });
  };
  const getFormData = subItem => {
    formData.value[subItem.fieldCode] = localBool
      ? localFormData[subItem.fieldCode]
      : subItem.value;
    formData.value['ocrSure'] = {
      front: localBool
        ? localFormData['ocrSure'].front
        : applyStatusMap.value.appealStatus === APPLY_STATUS.PASSED ||
          applyStatusMap.value.appealStatus === null,
      reverse: localBool
        ? localFormData['ocrSure'].reverse
        : applyStatusMap.value.appealStatus === APPLY_STATUS.PASSED ||
          applyStatusMap.value.appealStatus === null
    };
  };
  const getFormDataRules = subItem => {
    const rule = {
      type: 'string',
      required: subItem.izRequired === YES_NO_TYPE.YES,
      trigger: ['blur', 'change']
    };
    formRules.value[subItem.fieldCode] = rule;
  };
  const handleNext = debounce(async () => {
    if (!formData.value['idCardFront'] || !formData.value['idCardReverse']) {
      return uni.showToast({
        title: '请先上传身份证',
        icon: 'none'
      });
    }

    await proFormRef.value.validate();
    const dataKeys = Object.keys(formData.value);
    if (!smsCode.value && dataKeys.includes('mobile')) {
      return uni.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
    }
    if (
      dataKeys.includes('credentialStartDate') &&
      dataKeys.includes('credentialEndDate') &&
      new Date(formData.value['credentialStartDate']).getTime() >=
        new Date(formData.value['credentialEndDate']).getTime()
    ) {
      return uni.showToast({
        title: '身份证有效期开始时间不能大于结束时间',
        icon: 'none'
      });
    }
    const fIndex = dynamicState.value.findIndex(
      item => item.categoryCode === REAL_TYPE.CERTIFICATION_INFO
    );
    if (fIndex !== -1) {
      const findObj = dynamicState.value[fIndex].properties.find(item => {
        return (
          item.izRequired === YES_NO_TYPE.YES && !formData.value[item.fieldCode]
        );
      });
      if (findObj) {
        return uni.showToast({
          title: `请上传${findObj.labelName}`,
          icon: 'none'
        });
      }
    }
    const { front, reverse } = formData.value['ocrSure'];
    if (!getIdCardMessage()) {
      handleGetOcrIdCard();
    }
    const { name, idNumber } = getIdCardMessage();
    if (
      front &&
      reverse &&
      name === formData.value['workerName'] &&
      idNumber === formData.value['idCardNo']
    ) {
      handleRealNameAuth();
    } else {
      explainModalRef.value.open();
    }
  }, 500);

  const handleGetOcrIdCard = async () => {
    const params = {
      imageUrl: await getPreviewUrl(formData.value['idCardFront']),
      needParse: true
    };
    getOcrIdCard(params).then(res => {
      const { name, idNumber } = res.face;
      setIdCardMessage({
        name,
        idNumber
      });
    });
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

      const {
        sceneOption: { c }
      } = useUserStore();
      if (!c) {
        handleApplyTask();
      } else {
        handleGetInvitationCodeScan();
      }
    });
  };

  const handlePageBack = () => {
    setRealName(formData.value);
  };
  const handleExplainConfirm = debounce(() => {
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
    postAppealSubmit(params)
      .then(() => {
        uni.showToast({ title: '申述成功，请耐心等待', icon: 'none' });
      })
      .finally(() => {
        explainModalRef.value.close();
      });
  }, 500);
  const applyTipText = computed(() => {
    return applyStatusMap.value['appealStatus'] === APPLY_STATUS.REJECT
      ? `申诉失败：原因(${applyStatusMap.value.rejectCause})`
      : '申述中：正在申述请耐心等待～';
  });
  return {
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
  };
};
