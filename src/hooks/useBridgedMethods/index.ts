import { ComponentInternalInstance, ShallowRef } from 'vue';

export const useBridgedMethods = (
  methods: string[],
  componentInstance: ShallowRef<ComponentInternalInstance>
) => {
  const bridgedMethods = methods.reduce(
    (result: Record<string, any>, method: string) => {
      result[method] = (...args: unknown[]) => {
        // @ts-ignore
        componentInstance.value[method](...args);
      };
      return result;
    },
    {}
  );

  return {
    bridgedMethods
  };
};
