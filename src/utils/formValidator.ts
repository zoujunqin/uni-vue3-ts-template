export const mobileValidator = (rule, value, callback) => {
  if (!value) {
    return callback();
  }
  if (!isMobile(value.trim())) {
    return callback(new Error('手机号码格式错误'));
  }
  return callback();
};
export const isMobile = value => {
  const reg = /^1\d{10}$/;
  return reg.test(value);
};
