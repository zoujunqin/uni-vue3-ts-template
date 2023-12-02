import { ComponentInternalInstance, ShallowRef } from 'vue';

export const useBridgedMethods = (
  methods: string[],
  componentInstance: ShallowRef<ComponentInternalInstance>
) => {
  const bridgedMethods = methods.reduce((result, method) => {
    result[method] = (...args: unknown[]) => {
      componentInstance.value[method](...args);
    };
    return result;
  }, {});

  return {
    bridgedMethods
  };
};
