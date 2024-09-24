import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { MD5, AES, enc, mode, pad } from 'crypto-js';
import qs from 'qs';

import { useUserStore } from '@/pinia/modules/user';
import { PureHttpResponse } from '@/utils/http/types';
import { parseBlobData } from '@/utils/index';
import { getQueryString } from '@/utils/text';

const key = import.meta.env.VITE_CRYPTO_KEY;
const iv = import.meta.env.VITE_CRYPTO_IV;

const SECRET_KEY = enc.Utf8.parse(key);
const SECRET_IV = enc.Utf8.parse(iv);

/** AES加密 */
export const encryptString = (
  text: string,
  options = { md5: true }
): string => {
  const dataHex = enc.Utf8.parse(text);
  const encrypted = AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: mode.CBC,
    padding: pad.Pkcs7
  });

  const encryptedStr = encrypted.ciphertext.toString().toLocaleUpperCase();
  if (options.md5) {
    return MD5(encryptedStr).toString();
  }
  return encryptedStr;
};

/*
 * 对 url 参数加密
 * */
export const encryptUrlParams = (params: Record<string, any>): string => {
  return encryptString(getQueryString(params), { md5: false });
};

/*
 * 对 body 参数加密
 * */
export const encryptBodyParams = (
  params: FormData | Record<string, any>
): string | FormData => {
  /* #ifndef MP-WEIXIN */
  if (params instanceof FormData) {
    return params;
  }
  /* #endif */
  return encryptString(JSON.stringify(params), { md5: false });
};

/*
 * 参数加密
 * */
export const encryptParams = (config: AxiosRequestConfig) => {
  if (useUserStore().encryptionConfig?.enableRequestEncrypt) {
    const urlSplits = config.url.split('?');

    /* config.params 有值或者直接 url 带 ？xx */
    const hasUrlParams =
      Object.keys(config.params || {}).length > 0 || urlSplits[1];
    if (hasUrlParams) {
      config.url = urlSplits[0];

      const encryptedParams = {
        ...qs.parse(urlSplits[1]),
        ...config.params
      };

      config.params = {
        _query_string: encryptUrlParams(encryptedParams)
      };
    }

    const hasBodyParams = Object.keys(config.data || {}).length > 0;
    if (hasBodyParams) {
      config.data = {
        _body: encryptBodyParams(config.data)
      };
    }
  }
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
  const result: Record<string, any> = {};

  /* #ifndef MP-WEIXIN */
  if (data instanceof FormData) {
    data.forEach((value, key) => {
      result[key] = value;
    });
  }
  /* #endif */

  return { ...data, file: undefined };
};

/*
 * 根据返回头字段判断是否需要解密
 * */
export const isNeedDecrypt = response => {
  return (
    response.headers['Enable-Response-Decrypt'] &&
    response.headers['Enable-Response-Decrypt'] !== 'False'
  );
};

/*
 * 解密接口返回体
 * 前后端约定：如果是流返回不加密不解密
 * */
export const decryptResponseData = async (
  response: AxiosResponse<string, any> | PureHttpResponse
): Promise<AxiosResponse<any, any> | AxiosResponse<any, any>> => {
  let { data: responseData } = response;
  const {
    request: { responseType },
    status
  } = response;

  let isNeedParser = false;
  if (responseType === 'blob' && status !== 200) {
    /* 前端设置 responseType 为 Blob, 后端正常返回非 Blob 的数据，会导致数据被包在 Blob 对象中 */
    responseData = await parseBlobData(responseData);
    isNeedParser = true;
  }

  if (isNeedDecrypt(response)) {
    responseData = decryptString(responseData as string);
    isNeedParser = true;
  }
  if (isNeedParser) {
    /* 非 JSON 字符串会解析失败，直接返回 */
    try {
      responseData = JSON.parse(responseData);
    } catch {
      /* empty */
    }
  }

  return responseData;
};
