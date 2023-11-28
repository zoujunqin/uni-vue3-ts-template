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
