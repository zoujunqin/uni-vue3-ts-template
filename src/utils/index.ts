import { REAL_STATUS, YES_NO_TYPE } from '@/constant/taskDetail';

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

export const getRealStatus = val => {
  const { izRealname, izSignProtocol } = val;

  if (izRealname === YES_NO_TYPE.NO) {
    return REAL_STATUS.NEED_REAL;
  }

  if (izSignProtocol === YES_NO_TYPE.NO) {
    return REAL_STATUS.NEED_SIGN;
  }

  return REAL_STATUS.ALREADY_REAL;
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
