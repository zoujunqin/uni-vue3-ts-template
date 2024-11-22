import { httpStaticServer } from '@/httpStaticServer';

export const getUUID = (len = 32) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  for (let i = 0; i < len; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return randomString;
};

/* 解析 blob 数据 */
export const parseBlobData = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      resolve(text as string);
    };
    reader.onerror = () => {
      reject(new Error('解析失败'));
    };
    reader.readAsText(blob);
  });
};

export const getAssetsResource = (url: string) => {
  let path;
  /* #ifndef H5 || APP-PLUS || APP-PLUS-NVUE || APP-NVUE */
  path = url.replace(/^@http/, httpStaticServer);
  /* #endif */

  /* #ifdef H5 */
  if (import.meta.env.DEV) {
    path = import.meta.resolve(url.replace(/^@http/, '../static@http'));
  } else {
    path = import.meta.resolve(
      url.replace(/^@http/, import.meta.env.VITE_OSS_SERVER_URL)
    );
  }
  /* #endif */

  return path;
};
