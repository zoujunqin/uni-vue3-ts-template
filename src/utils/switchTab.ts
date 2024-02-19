import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import pagesJson from '@/pages.json';
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
      const {
        izRealname: izName,
        izSignProtocol: izSign,
        izFaceAuthenticated: izFace
      } = res;
      const current =
        izName === 'no' ? 0 : izSign === 'no' ? 1 : izFace === 'no' ? 2 : -1;
      console.log('跳转到实名页面');
      console.log('current:', current);
      uni.reLaunch({
        url: `/pagesAuth/realName/index?current=${current}`
      });
    });
  }
};
