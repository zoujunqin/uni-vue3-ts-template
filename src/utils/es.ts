/* 判断 async 函数 */
export const isAsync = fn => {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
};

export type CloneFn<F, T = F> = (x: F) => T;

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined';
