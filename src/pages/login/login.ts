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
  const okMsg = 'getPhoneNumber:ok';
  const denyMsg = 'getPhoneNumber:fail user deny';

  if (errMsg === okMsg) {
    weChatLogin({ code }).then(callback);
  } else if (errMsg === denyMsg) {
    uni.showToast({ title: '您已取消授权', icon: 'none' });
  }
};

export const mobileLogin = (param: ISmsParam) => {
  smsLogin(param).then(callback);
};

function callback(res) {
  setToken(res.token);
  fetchUserInfo();

  const codeId = getUserCodeID();
  if (!codeId) {
    uni.reLaunch({ url: '/pages/portal/index' });
  } else {
    sceneCodeMap[codeId]?.();
  }
}
