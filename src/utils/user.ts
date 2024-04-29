/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return token;
};

export const REAL_NAME_KEY = 'real-name';

export const ID_CARD_MESSAGE_KEY = 'idCard-message';

//实名信息
export function setRealName(data: unknown) {
  uni.setStorageSync(REAL_NAME_KEY, data);
}

export function getRealName() {
  return uni.getStorageSync(REAL_NAME_KEY);
}

//实名身份信息
export function setIdCardMessage(data: unknown) {
  uni.setStorageSync(ID_CARD_MESSAGE_KEY, data);
}

export function getIdCardMessage() {
  return uni.getStorageSync(ID_CARD_MESSAGE_KEY);
}
