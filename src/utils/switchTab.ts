import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import pagesJson from '@/pages.json';
import { dealStepCurrent } from '@/utils/index';
import { getInvitationCodeId } from '@/utils/user';

export const switchFirstTab = () => {
  uni.switchTab({ url: '/' + pagesJson.tabBar.list[0].pagePath });
};

export const loginJumpPage = () => {
  const codeId = getInvitationCodeId();
  if (codeId === '-1') {
    uni.switchTab({ url: '/' + pagesJson.tabBar.list[0].pagePath });
  } else {
    getInvitationCodeScan(codeId).then(res => {
      const current = dealStepCurrent(res);
      uni.reLaunch({
        url: `/pagesAuth/realName/index?current=${current}`
      });
    });
  }
};
