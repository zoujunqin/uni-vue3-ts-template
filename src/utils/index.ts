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
