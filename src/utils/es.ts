/* 判断 async 函数 */
export const isAsync = fn => {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
};
