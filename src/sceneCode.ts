import { TypeCode } from './constant/typeCode';

import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';
import { dealStepCurrent } from '@/utils';

export const sceneCodeMap = {
  // 扫小程序码, 进入实名认证页面
  [TypeCode.INVITE]: async option => {
    try {
      const res = await getInvitationCodeScan(option);
      const current = dealStepCurrent(res);
      if (current === -1) {
        uni.redirectTo({ url: '/pages/portal/index' });
      } else {
        const taskQueryParams = {
          invitationCodeId: option,
          current: current,
          sourceType: PROTOCOL_TYPE.INVITATION_CODE
        };
        uni.redirectTo({
          url: `/pagesAuth/realName/index?taskQueryParams=${JSON.stringify(
            taskQueryParams
          )}`
        });
      }
    } catch (err) {
      uni.showToast({
        title: err.response.data.message,
        duration: 3000,
        icon: 'none'
      });
    }
  }
};
