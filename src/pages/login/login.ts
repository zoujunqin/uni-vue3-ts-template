import { ISmsParam, smsLogin, weChatLogin } from '@/api/fe/wechat';
import { useUserStore } from '@/pinia/modules/user';
import { sceneCodeMap } from '@/sceneCode';

export interface IPhoneNumberResult {
  iv: string;
  errMsg: string;
  encryptedData: string;
  code: string;
}

const { setToken, fetchUserInfo, getUserCodeID } = useUserStore();
export const weChatAuthLogin = (res: IPhoneNumberResult) => {
  const { code, errMsg } = res;

  if (errMsg === 'getPhoneNumber:ok') {
    uni.showLoading({ title: '登录中...' });
    weChatLogin({ code }).then(callback).finally(uni.hideLoading);
  } else if (errMsg === 'getPhoneNumber:fail user deny') {
    uni.showToast({ title: '您已取消授权', icon: 'none' });
  }
};

export const mobileLogin = (param: ISmsParam) => {
  uni.showLoading({ title: '登录中...' });
  smsLogin(param).then(callback).finally(uni.hideLoading);
};

function callback(res) {
  setToken(res.token);
  fetchUserInfo();

  const codeId = getUserCodeID();
  if (!codeId) {
    uni.redirectTo({ url: '/pages/portal/index' });
  } else {
    sceneCodeMap[codeId]?.();
  }
}
