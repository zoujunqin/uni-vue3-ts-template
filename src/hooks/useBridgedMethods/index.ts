import { ComponentInternalInstance, ShallowRef } from 'vue';

export const useBridgedMethods = <T extends ReadonlyArray<string>>(
  methods: readonly [...T],
  componentInstance: ShallowRef<ComponentInternalInstance>
) => {
  const bridgedMethods = methods.reduce(
    (result, method) => {
      const [keyword, methodName] = method.split(' ');

      if (keyword === 'async') {
        result[methodName] = async (...args: unknown[]) => {
          return componentInstance.value[methodName](...args);
        };
      } else {
        result[methodName] = (...args: unknown[]) => {
          return componentInstance.value[methodName](...args);
        };
      }

      return result;
    },
    {} as Record<T[number], Function>
  );

  return { bridgedMethods };
};
