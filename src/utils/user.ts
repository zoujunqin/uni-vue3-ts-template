import { IPersonInfo } from '@/api/fe/wechat/personal_center';

export const TOKEN_KEY = 'authorized-token';

export function getToken(): string {
  return uni.getStorageSync(TOKEN_KEY);
}

export function setToken(token: string) {
  uni.setStorageSync(TOKEN_KEY, token);
}

export function removeToken() {
  uni.removeStorageSync(TOKEN_KEY);
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return token;
};

export const USER_INFO_KEY = 'user-info';
export const REAL_NAME_KEY = 'real-name';
export const INVITATION_ID_KEY = 'invitation-id';

export function getUserInfo(): string {
  return uni.getStorageSync(USER_INFO_KEY);
}

export function setUserInfo(userInfo: IPersonInfo) {
  uni.setStorageSync(USER_INFO_KEY, userInfo);
}

export function removeUserInfo() {
  uni.removeStorageSync(USER_INFO_KEY);
}
//实名信息
export function setRealName(data: unknown) {
  uni.setStorageSync(REAL_NAME_KEY, data);
}

export function getRealName() {
  return uni.getStorageSync(REAL_NAME_KEY);
}

//邀请码id
export function setInvitationCodeId(id: unknown) {
  uni.setStorageSync(INVITATION_ID_KEY, id);
}

export function getInvitationCodeId() {
  return uni.getStorageSync(INVITATION_ID_KEY);
}
