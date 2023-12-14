import { isFunction } from 'lodash-es';
import { Ref, shallowRef, watch } from 'vue';

function useFirst(
  initial: Ref<number>,
  current: Ref<number>,
  callback: Function
): Object;
function useFirst(
  initial: Ref<string>,
  current: Ref<string>,
  callback: Function
): Object;
function useFirst(
  initial: Ref<number | string>,
  current: Ref<number | string>,
  callback: Function
) {
  const isFirst = shallowRef(true);

  watch(
    current,
    () => {
      if (!isFirst.value) return;
      if (current.value === initial.value) {
        isFirst.value = false;
        isFunction(callback) && callback();
      }
    },
    { immediate: true }
  );

  return {
    isFirst
  };
}

export { useFirst };
