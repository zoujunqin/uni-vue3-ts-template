import { MD5, AES, enc, mode, pad } from 'crypto-js';

import { getQueryString } from '@/utils/text';
const key = import.meta.env.VITE_CRYPTO_KEY;
const iv = import.meta.env.VITE_CRYPTO_IV;

const SECRET_KEY = enc.Utf8.parse(key);
const SECRET_IV = enc.Utf8.parse(iv);

/** AES加密 */
export const encryptString = (text: string): string => {
  const dataHex = enc.Utf8.parse(text);
  const encrypted = AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: mode.CBC,
    padding: pad.Pkcs7
  });
  return MD5(encrypted.ciphertext.toString().toLocaleUpperCase()).toString();
};

export const decryptString = (text: string) => {
  const bytes = AES.decrypt(
    <any>{
      ciphertext: enc.Hex.parse(text)
    },
    SECRET_KEY,
    {
      iv: SECRET_IV,
      mode: mode.CBC,
      padding: pad.Pkcs7
    }
  );
  return bytes.toString(enc.Utf8);
};

/*
 * 对 url 参数加密
 * */
export const encryptUrlParams = (params: Record<string, any>): string => {
  return encryptString(getQueryString(params));
};

/*
 * 对 body 参数加密
 * */
export const encryptBodyParams = (
  params: FormData | Record<string, any>
): string | FormData => {
  return params instanceof FormData
    ? params
    : encryptString(JSON.stringify(params));
};

/*
 * 词典排序，在加密前需要把对象转为字符串时排序
 * */
export const dictionarySort = list => list.sort();

/*
 * FormData 转对象，去掉 file 属性
 * 普通对象去掉 file 属性
 * */
export const getObjectExcludeFile = (data: FormData | Record<string, any>) => {
  let result: Record<string, any> = {};

  if (data instanceof FormData) {
    data.forEach((value, key) => {
      result[key] = value;
    });
  } else {
    result = { ...data };
  }

  result.file = undefined;
  return result;
};
