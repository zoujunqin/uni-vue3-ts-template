import { ref } from 'vue';

import {
  getInvitationProtocolSignUrlForCode,
  getInvitationProtocolSignUrlForTask
} from '@/api/fe/fe_worker_protocol';
import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { applyTask } from '@/api/fe/wechat/task';
import { dealStepCurrent } from '@/utils';

export const useHandlerCode = ({ infoParams, signUrl }) => {
  const callBackUrl = ref('http://47.96.112.174:8003/');
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
  // 申请任务进入已实名
  const handleGetTaskSignUrl = () => {
    const params = {
      callbackPage: callBackUrl.value,
      taskId: infoParams.value.taskId
    };
    getInvitationProtocolSignUrlForTask(params)
      .then(res => {
        signUrl.value = res;
      })
      .catch(err => {
        handleErrBack(err);
      });
  };
  // 邀请码进入已实名
  const handleGetCodeSignUrl = () => {
    const params = {
      callbackPage: callBackUrl.value,
      codeId: infoParams.value.invitationCodeId
    };
    getInvitationProtocolSignUrlForCode(params)
      .then(res => {
        signUrl.value = res;
      })
      .catch(err => {
        handleErrBack(err);
      });
  };
  // 申请任务进入未实名进入流程
  const handleApplyTask = () => {
    const { taskId } = infoParams.value;
    applyTask(taskId).then(res => {
      const current = dealStepCurrent(res);
      // TODO 税局三方对接
      if (current === 1) {
        const params = {
          callbackPage: callBackUrl.value,
          taskId: taskId
        };
        getInvitationProtocolSignUrlForTask(params)
          .then(res => {
            signUrl.value = res;
          })
          .catch(err => {
            handleErrBack(err);
          });
      } else {
        console.log('进入活体认证');
      }
    });
  };
  //邀请码进入未实名进入流程
  const handleGetInvitationCodeScan = () => {
    const { invitationCodeId } = infoParams.value;
    getInvitationCodeScan(invitationCodeId).then(res => {
      const current = dealStepCurrent(res);
      // TODO 税局三方对接
      if (current === 1) {
        const params = {
          callbackPage: callBackUrl.value,
          codeId: invitationCodeId
        };
        getInvitationProtocolSignUrlForCode(params)
          .then(res => {
            signUrl.value = res;
          })
          .catch(err => {
            handleErrBack(err);
          });
      } else {
        console.log('进入活体认证');
      }
    });
  };
  return {
    handleGetTaskSignUrl,
    handleGetCodeSignUrl,
    handleApplyTask,
    handleGetInvitationCodeScan
  };
};
