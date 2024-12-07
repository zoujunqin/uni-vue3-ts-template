import { isBoolean } from 'lodash';
import { ref } from 'vue';

/**
 * @description: 切换变量状态
 * @param {boolean} initialValue
 * @return {*}
 */
export function useToggle(initialValue = false) {
  const result = ref(initialValue);
  const toggle = (value?: boolean) => {
    result.value = isBoolean(value) ? value : !result.value;
    return result.value;
  };
  return [result, toggle] as const;
}
