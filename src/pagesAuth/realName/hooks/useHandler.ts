import { computed, ref } from 'vue';

import { applyTask } from '@/api/fe/wechat/task';
import {
  getRealNameInfo,
  realNameAuth,
  postAppealSubmit
} from '@/api/fe/wechat/worker';
import { getAreaListByDistrictId } from '@/api/system/area';
import { APPLY_STATUS, REAL_TYPE, YES_NO_TYPE } from '@/constant/taskDetail';
import { getRealName, setRealName } from '@/utils/user';

export const useHandler = ({ infoParams, applyStatusMap }) => {
  const formData = ref<any>({});
  const proFormRef = ref();
  const dynamicState = ref();
  const formRules = ref({});
  const smsCode = ref('');
  const explainModalRef = ref();
  const localFormData = getRealName() || {};
  const localBool = Object.keys(localFormData).length > 0;
  const handleGetRealNameInfo = () => {
    getRealNameInfo(infoParams.value).then(res => {
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
      front: false,
      reverse: false,
      areaText: '',
      areaCode: []
    };
  };
  const getFormDataRules = subItem => {
    const rule = {
      type: 'string',
      required: subItem.izRequired === YES_NO_TYPE.YES,
      trigger: ['blur', 'change']
    };
    formRules.value[subItem.fieldCode] = rule;
    if (subItem.fieldCode === 'domicileAreaCode' && subItem.value) {
      getAreaListByDistrictId({ districtId: subItem.value }).then(res => {
        const { left, middle, right } = res;
        formData.value['ocrSure'].areaCode = [left.id, middle.id, right.id];
        formData.value['ocrSure'].areaText = [
          left.name,
          middle.name,
          right.name
        ].join('/');
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
  const handlePageBack = () => {
    setRealName(formData.value);
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
