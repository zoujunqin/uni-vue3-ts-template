import { ISmsParam, smsLogin, weChatLogin } from '@/api/fe/wechat';
import { useAreaStore } from '@/pinia/modules/area';
import { useUserStore } from '@/pinia/modules/user';
import { sceneCodeMap } from '@/sceneCode';

export interface IPhoneNumberResult {
  iv: string;
  errMsg: string;
  encryptedData: string;
  code: string;
}

const { setToken } = useUserStore();
const { setAreaData } = useAreaStore();

export const weChatAuthLogin = (res: IPhoneNumberResult) => {
  const { code, errMsg } = res;
  const okMsg = 'getPhoneNumber:ok';
  const denyMsg = 'getPhoneNumber:fail user deny';
  const { sceneOption } = useUserStore();
  const { c } = sceneOption;
  const param = {
    code: code,
    invitationCodeId: c || undefined
  };
  if (errMsg === okMsg) {
    weChatLogin(param).then(res => {
      callback(res, 1);
    });
  } else if (errMsg === denyMsg) {
    uni.showToast({ title: '您已取消授权', icon: 'none' });
  }
};

export const mobileLogin = (param: ISmsParam) => {
  const { sceneOption } = useUserStore();
  const { c } = sceneOption;
  param['invitationCodeId'] = c || undefined;
  smsLogin(param).then(res => {
    callback(res, 2);
  });
};

function callback(res, delta) {
  setToken(res.token);
  setAreaData();

  const { sceneOption } = useUserStore();
  const { t } = sceneOption;
  if (!t) {
    uni.navigateBack({ delta });
  } else {
    sceneCodeMap[t]?.(sceneOption);
  }
}
