import dayjs from 'dayjs';
import { cloneDeep, debounce, isEmpty, isEqual } from 'lodash-es';
import { storeToRefs } from 'pinia';
import { computed, nextTick, ref, shallowRef } from 'vue';

import { useRealNameStore } from './useStore';

import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { applyTask } from '@/api/fe/wechat/task';
import {
  getRealNameInfo,
  postAppealSubmit,
  realNameAuth
} from '@/api/fe/wechat/worker';
import {
  APPLY_STATUS_MAP,
  PROTOCOL_TYPE,
  REAL_STATUS,
  REAL_STATUS_MAP,
  REAL_TYPE,
  YES_NO_TYPE
} from '@/constant/taskDetail';
import { useUserStore } from '@/pinia/modules/user';
import { getRealStatus } from '@/utils';

export const useHandler = ({ routeParams }) => {
  const userRealNameStore = useRealNameStore();
  const { formData } = storeToRefs(userRealNameStore);

  const proFormRef = ref();
  const formRules = ref(<any>{});
  const formItemGroups = ref();
  const sureModalRef = ref();
  const backupCopyData = ref<Record<string, any>>({});

  const formItemGroupMap = computed(() => {
    return formItemGroups.value.reduce((res, group) => {
      res[group.categoryCode] = group;
      return res;
    }, {});
  });

  const applyStatusMap = shallowRef({ appealStatus: '', rejectCause: '' });

  const explainModalRef = ref();
  //使用缓存数据，比较获取数据与缓存数据
  const handleSureDataConfirm = () => {
    Object.keys(formData.value).forEach(key => {
      const remoteValue = formData.value[key];
      const localValue = backupCopyData.value[key];
      if (!isEqual(remoteValue, localValue)) {
        formData.value[key] = localValue;
      }
    });
    sureModalRef.value.close();
  };
  const handleGetRealNameInfo = () => {
    getRealNameInfo(routeParams.value).then(async res => {
      if (!isEmpty(formData.value)) {
        backupCopyData.value = cloneDeep(formData.value);
      }
      useRealNameStore().initFormData();
      nextTick(() => {
        const { propertyGroups, appealStatus, rejectCause } = res;
        applyStatusMap.value = { appealStatus, rejectCause };

        const idCardGroup = {
          categoryCode: REAL_TYPE.ID_CARD,
          categoryName: '上传身份证',
          properties: []
        };

        for (const group of propertyGroups) {
          let i = group.properties.length - 1;
          while (i >= 0) {
            const { fieldCode, value, izRequired } = group.properties[i];
            formData.value[fieldCode] = value;
            formRules.value[fieldCode] = {
              required: izRequired === YES_NO_TYPE.YES,
              trigger: ['blur', 'change']
            };
            // 手机号额外需要验证码
            if (fieldCode === 'mobile') {
              formRules.value.smsCode = formRules.value.mobile;
            }
            // 身份证正面和返面单独处理
            if (['idCardFront', 'idCardReverse'].includes(fieldCode)) {
              idCardGroup.properties.push(...group.properties.splice(i, 1));
            }
            i--;
          }
        }

        if (idCardGroup.properties.length) {
          propertyGroups.unshift(idCardGroup);
        }

        formItemGroups.value = propertyGroups;
        proFormRef.value.setRules(formRules.value);
        if (!isEmpty(backupCopyData.value)) {
          sureModalRef.value.open();
        }
      });
    });
  };
  const validMobile = () => {
    if (!formData.value.mobile) {
      uni.showToast({
        title: '请输入手机号码',
        icon: 'none'
      });
    }
    return !!formData.value.mobile;
  };

  const handleNext = async () => {
    const {
      idCardFront,
      idCardReverse,
      credentialStartDate,
      credentialEndDate
    } = formData.value;
    // 表单校验
    await proFormRef.value.validate();
    // 身份证校验
    const idCardGroup = formItemGroupMap.value[REAL_TYPE.ID_CARD];

    if (idCardGroup) {
      if (!idCardFront || !idCardReverse) {
        uni.showToast({ title: '请先上传身份证', icon: 'none' });
        return;
      }

      if (
        credentialEndDate &&
        credentialStartDate &&
        dayjs(credentialEndDate).isBefore(dayjs(credentialStartDate))
      ) {
        uni.showToast({
          title: '身份证有效期开始时间不能大于结束时间',
          icon: 'none'
        });
        return;
      }
    }

    // 资质校验
    const certificationGroup =
      formItemGroupMap.value[REAL_TYPE.CERTIFICATION_INFO];
    if (certificationGroup) {
      const failedLabels = [];
      certificationGroup.properties.forEach(group => {
        const { izRequired, fieldCode, labelName } = group;

        if (izRequired === YES_NO_TYPE.YES && !formData.value[fieldCode]) {
          failedLabels.push(labelName);
        }
      });
      if (failedLabels.length) {
        uni.showToast({
          title: `请上传${failedLabels.join('，')}`,
          icon: 'none'
        });
        return;
      }
    }
    // 填写的名字、身份证号码和 ocr 识别的不一样 触发申诉逻辑
    const idCardFrontInfo = await useRealNameStore().getIdCardFrontInfo();

    if (idCardFrontInfo) {
      const { name, idNumber } = idCardFrontInfo;
      const { workerName, idCardNo } = formData.value;

      if (name !== workerName || idNumber !== idCardNo) {
        explainModalRef.value.open();
        return;
      }
    }

    handleRealNameAuth();
  };

  const handleRealNameAuth = async () => {
    const formDataCopy = { ...formData.value, smsCode: undefined };
    const { taskId, orderDetailId, invitationCodeId } = routeParams.value;

    const params = {
      taskId,
      orderDetailId,
      invitationCodeId,
      smsCode: formData.value.smsCode,
      properties: Object.keys(formDataCopy).map(key => {
        return { fieldCode: key, value: formData.value[key] };
      })
    };

    realNameAuth(params).then(() => {
      const {
        sceneOption: { t, c }
      } = useUserStore();
      userRealNameStore.$reset();
      const { sourceType } = routeParams.value;
      const params = `?taskQueryParams=${JSON.stringify(routeParams.value)}`;
      if (!t || sourceType === PROTOCOL_TYPE.TASK) {
        // 正常申请任务流程
        applyTask(routeParams.value).then(res => {
          const realStatus = getRealStatus(res);

          if (realStatus === REAL_STATUS.ALREADY_REAL) {
            uni.showToast({ title: '申请成功', icon: 'none' });
          }
          uni.navigateTo({
            url: REAL_STATUS_MAP[realStatus].pagePath + params
          });
        });
      } else {
        // 邀请码流程
        getInvitationCodeScan(c).then(res => {
          const realStatus = getRealStatus(res);
          uni.navigateTo({
            url: REAL_STATUS_MAP[realStatus].pagePath + params
          });
        });
      }
    });
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
    const { appealStatus, rejectCause } = applyStatusMap.value;
    return APPLY_STATUS_MAP[appealStatus]?.getTip(rejectCause) || '';
  });

  return {
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
    handleExplainConfirm,
    sureModalRef,
    handleSureDataConfirm
  };
};
