// 处理银行卡号码显示6212 6723 8322 673
import { isArray, isObject } from 'lodash-es';

import { dictionarySort } from '@/utils/crypto';

export const handleGetBankNum = (value: string) => {
  return value.replace(/(.{4})/g, '$1 ');
};

//  * 保留前后四位 中间每4个*会有一个空格  6212 **** **** *** 0222
export const handleGetBankNumNoShow = (value: string) => {
  if (value && value.length > 8) {
    return `${value.substring(0, 4)} ${'*'
      .repeat(value.length - 8)
      .replace(/(.{4})/g, `$1 `)}${value.length % 4 ? ' ' : ''}${value.slice(
      -4
    )}`;
  }
  return value;
};

/* 连字符连接 AB */
export const hyphenAB = (
  varA: number | string,
  varB: number | string,
  hyphen = '~'
) => {
  if (varA && varB) return varA + hyphen + varB;
  else return varA || varB;
};
/* 连字符连接 AB AB 相等为A */
export const hyphenABEqualityA = (
  varA: number | string,
  varB: number | string,
  hyphen = '~'
) => {
  if (varA && varB && varA !== varB) return varA + hyphen + varB;
  else return varA || varB;
};

/*
 * 对参数进行字典序并拼接成字符串
 * */
export const getQueryString = (params: Record<string, any>): string => {
  const sortedKeys = dictionarySort(Object.keys(params));
  const newParams = [];

  sortedKeys.forEach(sortedKey => {
    const value = params[sortedKey];

    if (value === null) {
      newParams.push(sortedKey + '=');
    }

    if (value !== undefined) {
      const paramsObj = {};
      const keys = Object.keys(value);
      /* 数组和对象转成 arr[0]=1&arr[1]=2 的格式 */
      if ((isArray(value) || isObject(value)) && keys.length) {
        keys.forEach(key => {
          paramsObj[`${sortedKey}[${key}]`] = value[key];
        });
        newParams.push(getQueryString(paramsObj));
      }
      if (!isArray(value) && !isObject(value)) {
        newParams.push(sortedKey + '=' + value);
      }
    }
  });

  return newParams.join('&');
};
