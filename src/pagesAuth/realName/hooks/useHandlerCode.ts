import { ref } from 'vue';

import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { applyTask } from '@/api/fe/wechat/task';
import { postWorkerProtocolSign } from '@/api/fe/wechat/worker';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';
import { dealStepCurrent } from '@/utils';
import { switchFirstTab } from '@/utils/switchTab';
import { getInvitationCodeId } from '@/utils/user';

export const useHandlerCode = ({ infoParams, signUrl, current }) => {
  const callbackPage = ref('http://47.96.112.174:8003/');
  const handleErrBack = err => {
    uni.showModal({
      title: '提示',
      content: err.response.data.message,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          uni.navigateBack();
        }
      }
    });
  };
  const handlePostWorkerProtocolSign = () => {
    uni.showLoading({ title: '请求中...' });
    const { sourceType, orderDetailId, taskId, id } = infoParams.value;
    const idMap = {
      [PROTOCOL_TYPE.ORDER_DETAIL]: orderDetailId,
      [PROTOCOL_TYPE.TASK]: taskId,
      [PROTOCOL_TYPE.INVITATION_CODE]: id
    };
    const params = {
      callbackPage: callbackPage.value,
      id: idMap[sourceType],
      sourceType
    };
    postWorkerProtocolSign(params)
      .then(res => {
        signUrl.value = res;
      })
      .finally(() => {
        uni.hideLoading();
      })
      .catch(err => {
        handleErrBack(err);
      });
  };
  // 申请任务进入未实名进入流程
  const handleApplyTask = () => {
    applyTask(infoParams.value).then(res => {
      current.value = dealStepCurrent(res);
      if (current.value === 1) {
        handlePostWorkerProtocolSign();
      } else {
        uni.showToast({
          title: '申请成功',
          icon: 'none'
        });
        switchFirstTab();
      }
    });
  };
  //邀请码进入未实名进入流程
  const handleGetInvitationCodeScan = () => {
    const invitationCodeId = getInvitationCodeId();
    getInvitationCodeScan(invitationCodeId).then(res => {
      current.value = dealStepCurrent(res);
      if (current.value === 1) {
        handlePostWorkerProtocolSign();
      } else {
        switchFirstTab();
      }
    });
  };
  return {
    handleApplyTask,
    handleGetInvitationCodeScan,
    handlePostWorkerProtocolSign
  };
};
