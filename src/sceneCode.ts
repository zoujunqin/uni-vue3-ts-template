import { TYPE_CODE } from './constant/typeCode';

import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import {
  PROTOCOL_TYPE,
  REAL_STATUS,
  REAL_STATUS_MAP
} from '@/constant/taskDetail';
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
      uni.redirectTo({
        url: REAL_STATUS_MAP[realStatus].pagePath + routeParams
      });
    } catch (err) {
      uni.showToast({
        title: err.response.data.message,
        duration: 3000,
        icon: 'none'
      });
    }
  }
};
