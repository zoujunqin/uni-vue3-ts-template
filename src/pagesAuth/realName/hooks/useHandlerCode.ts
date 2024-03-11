import { ref } from 'vue';

import {
  getInvitationProtocolSignUrlForCode,
  getInvitationProtocolSignUrlForTask
} from '@/api/fe/fe_worker_protocol';
import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { applyTask } from '@/api/fe/wechat/task';
import { dealStepCurrent } from '@/utils';
import { switchFirstTab } from '@/utils/switchTab';

export const useHandlerCode = ({ infoParams, signUrl, current }) => {
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
    uni.showLoading({ title: '请求中...' });
    const params = {
      callbackPage: callBackUrl.value,
      taskId: infoParams.value.taskId
    };
    getInvitationProtocolSignUrlForTask(params)
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
  // 邀请码进入已实名
  const handleGetCodeSignUrl = () => {
    uni.showLoading({ title: '请求中...' });
    const params = {
      callbackPage: callBackUrl.value,
      codeId: infoParams.value.invitationCodeId
    };
    getInvitationProtocolSignUrlForCode(params)
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
        const params = {
          callbackPage: callBackUrl.value,
          taskId: infoParams.value.taskId
        };
        uni.showLoading({ title: '请求中...' });
        getInvitationProtocolSignUrlForTask(params)
          .then(res => {
            signUrl.value = res;
          })
          .finally(() => {
            uni.hideLoading();
          })
          .catch(err => {
            handleErrBack(err);
          });
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
    const { invitationCodeId } = infoParams.value;
    getInvitationCodeScan(invitationCodeId).then(res => {
      current.value = dealStepCurrent(res);
      if (current.value === 1) {
        const params = {
          callbackPage: callBackUrl.value,
          codeId: invitationCodeId
        };
        uni.showLoading({ title: '请求中...' });
        getInvitationProtocolSignUrlForCode(params)
          .then(res => {
            signUrl.value = res;
          })
          .finally(() => {
            uni.hideLoading();
          })
          .catch(err => {
            handleErrBack(err);
          });
      } else {
        switchFirstTab();
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
