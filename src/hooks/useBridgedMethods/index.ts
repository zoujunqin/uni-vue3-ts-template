import { ComponentInternalInstance, ShallowRef } from 'vue';

export const useBridgedMethods = <T extends ReadonlyArray<string>>(
  methods: readonly [...T],
  componentInstance: ShallowRef<ComponentInternalInstance>
) => {
  const bridgedMethods = methods.reduce(
    (result, method) => {
      if (method.startsWith('async ')) {
        const methodName = method.replace('async ', '');
        result[methodName] = async function (...args: unknown[]) {
          return await componentInstance.value[methodName](...args);
        };
      } else {
        result[method] = function (...args: unknown[]) {
          return componentInstance.value[method as string](...args);
        };
      }

      return result;
    },
    {} as Record<T[number], Function>
  );

  return { bridgedMethods };
};
