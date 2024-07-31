import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

import { useUserStore } from '@/pinia/modules/user';
import {
  dictionarySort,
  encryptString,
  getObjectExcludeFile
} from '@/utils/crypto';
import { getUUID } from '@/utils/index';
import { getQueryString } from '@/utils/text';

export const addSignature = (config: AxiosRequestConfig) => {
  const urlSplits = config.url.split('?');
  const apiUrl = urlSplits[0];

  /* 直接拼接在 url ？ 后面，不是通过 params 传进来的参数 */
  const apiUrlQueryParams = urlSplits[1] ? qs.parse(urlSplits[1]) : {};
  const queryParams = Object.assign(apiUrlQueryParams, config.params || {});

  let requestBody = config.data;

  /* #ifndef MP-WEIXIN */
  /* FormData 参数转成 query 的形式 */
  if (
    config.data instanceof FormData ||
    ['multipart/form-data', 'application/x-www-form-urlencoded'].includes(
      config.headers['Content-Type']
    )
  ) {
    requestBody = null;
    Object.assign(queryParams, getObjectExcludeFile(config.data));
  }
  /* #endif */

  const queryString = getQueryString(queryParams);
  const requestBodyString = requestBody && JSON.stringify(requestBody);

  const finalString = [queryString, requestBodyString]
    .filter(Boolean)
    .join('&');

  const authorization = useUserStore().token || '';
  const randomString = getUUID();
  const timestamp = Date.now().toString();

  const list = [
    `Authorization=${authorization}`,
    `Random-String=${randomString}`,
    `Timestamp=${timestamp}`,
    encodeURI(apiUrl),
    finalString
  ].filter(Boolean);

  const fullString = dictionarySort(list).join(';');
  const encryptedString = encryptString(fullString);

  config.headers['Signature'] = encryptedString;
  config.headers['Random-String'] = randomString;
  config.headers['Timestamp'] = timestamp;
};
