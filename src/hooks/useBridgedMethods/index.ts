import { ComponentInternalInstance, ShallowRef } from 'vue';

export const useBridgedMethods = <T extends ReadonlyArray<string>>(
  methods: readonly [...T],
  componentInstance: ShallowRef<ComponentInternalInstance>
) => {
  const bridgedMethods = methods.reduce(
    (result, method) => {
      result[method] = (...args: unknown[]) => {
        // @ts-ignore
        componentInstance.value[method](...args);
      };
      return result;
    },
    {} as Record<T[number], Function>
  );

  return { bridgedMethods };
};
