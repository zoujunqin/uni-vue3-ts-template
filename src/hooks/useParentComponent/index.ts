import { getCurrentInstance } from 'vue-demi';

export function useParentComponent(name: string | undefined = undefined) {
  const instance = getCurrentInstance();
  let parent = instance?.parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.type && parent.type.__name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.parent;
    } else {
      return parent;
    }
  }
  return undefined;
}
