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

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined';

export const dealStepCurrent = val => {
  const { izRealname: izName, izSignProtocol: izSign } = val;
  const current = izName === 'no' ? 0 : izSign === 'no' ? 1 : -1;
  return current;
};
