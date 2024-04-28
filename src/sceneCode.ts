import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';
import { useUserStore } from '@/pinia/modules/user';
import { dealStepCurrent } from '@/utils';

export const sceneCodeMap = {
  // 扫小程序码, 进入实名认证页面
  '1783764846524317698': async option => {
    const { setUserCodeID } = useUserStore();
    const { scene: codeId } = option;

    setUserCodeID(codeId);

    try {
      const res = await getInvitationCodeScan(codeId);
      const current = dealStepCurrent(res);

      if (current === -1) {
        uni.redirectTo({ url: '/page/portal/index' });
      } else {
        const taskQueryParams = {
          invitationCodeId: codeId,
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
