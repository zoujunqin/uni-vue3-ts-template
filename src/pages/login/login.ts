import { ISmsParam, smsLogin, weChatLogin } from '@/api/fe/wechat';
import { loginPagePath, mobileLoginPagePath } from '@/constant/pagePath';
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
    weChatLogin(param).then(callback);
  } else if (errMsg === denyMsg) {
    uni.showToast({ title: '您已取消授权', icon: 'none' });
  }
};

export const mobileLogin = (param: ISmsParam) => {
  const { sceneOption } = useUserStore();
  const { c } = sceneOption;
  param['invitationCodeId'] = c || undefined;
  smsLogin(param).then(callback);
};

function callback(res) {
  setToken(res.token);
  setAreaData();

  const { sceneOption } = useUserStore();
  const { t } = sceneOption;
  if (!t) {
    let delta = 1;
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const prevPage = pages[pages.length - 2];
    const currentPageIsMobileLogin =
      currentPage?.$page?.fullPath?.startsWith(mobileLoginPagePath);
    const prevPageIsLogin = prevPage?.$page?.fullPath.startsWith(loginPagePath);

    if (currentPageIsMobileLogin && prevPageIsLogin) {
      delta = 2;
    }

    uni.navigateBack({ delta });
  } else {
    sceneCodeMap[t]?.(sceneOption);
  }
}
