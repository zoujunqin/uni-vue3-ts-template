import { TYPE_CODE } from './constant/typeCode';
import { handleRealStatusTo } from './utils/lockPlugin';

import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { PROTOCOL_TYPE, REAL_STATUS } from '@/constant/taskDetail';
import { getRealStatus } from '@/utils';

export const sceneCodeMap = {
  // 扫小程序码, 进入实名认证页面
  [TYPE_CODE.INVITE]: async option => {
    try {
      const { c: code } = option;
      const res = await getInvitationCodeScan(code);
      const realStatus = getRealStatus(res);

      const params = JSON.stringify({
        invitationCodeId: code,
        sourceType: PROTOCOL_TYPE.INVITATION_CODE
      });
      const routeParams =
        realStatus === REAL_STATUS.ALREADY_REAL
          ? ''
          : `?taskQueryParams=${params}`;
      const paramsQuery = {
        realStatus,
        params: routeParams,
        jump: 'redirectTo'
      };
      handleRealStatusTo(paramsQuery);
    } catch (err) {
      uni.showToast({
        title: err.response.data.message,
        duration: 3000,
        icon: 'none'
      });
    }
  }
};
