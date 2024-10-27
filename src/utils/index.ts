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
