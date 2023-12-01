import { computed } from 'vue';

export function useVModel<
  P extends object,
  K extends keyof P,
  Name extends string
>(props: P, key?: K, emit?: (name: Name, ...args: any[]) => void) {
  const modelValue = computed({
    get: () => props[key],
    set: val => {
      emit('update:' + key, val);
    }
  });
  return modelValue;
}
