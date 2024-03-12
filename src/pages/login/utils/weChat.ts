import { loginWithWeChat } from '@/api/fe/wechat';
import { useUserStore } from '@/pinia/modules/user';
import { loginJumpPage } from '@/utils/switchTab';

export interface IPhoneNumberResult {
  iv: string;
  errMsg: string;
  encryptedData: string;
  code: string;
}

export const loginUnderWeChatAuth = (res: IPhoneNumberResult) => {
  const { setToken, fetchUserInfo } = useUserStore();
  const { code, errMsg } = res;

  if (errMsg === 'getPhoneNumber:ok') {
    uni.showLoading({ title: '登录中...' });
    loginWithWeChat({ code })
      .then(res => {
        setToken(res.token);
        fetchUserInfo();
        loginJumpPage();
      })
      .finally(() => {
        uni.hideLoading();
      });
  } else if (errMsg === 'getPhoneNumber:fail user deny') {
    uni.showToast({ title: '您已取消授权', icon: 'none' });
  }
};
