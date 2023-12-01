import { capitalize } from 'lodash-es';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

interface VM extends ComponentInternalInstance {
  emitsOptions?: Record<string, null>;
}

export const useBridgedEmits = (
  eventNames: string[] = [],
  onPrefix: string = ''
) => {
  const vm: VM | null = getCurrentInstance();
  const emitsOptions = vm?.emitsOptions || {};
  const _emit =
    vm?.emit || vm?.$emit?.bind(vm) || vm?.proxy?.$emit?.bind(vm?.proxy);

  const bridgedEvents = eventNames.reduce(
    (eventAttrs: Record<string, any>, eventName: string) => {
      emitsOptions[onPrefix ? onPrefix + capitalize(eventName) : eventName] =
        null;

      eventAttrs['on' + capitalize(eventName)] = (...args: unknown[]) => {
        _emit(onPrefix ? onPrefix + capitalize(eventName) : eventName, ...args);
      };
      return eventAttrs;
    },
    {}
  );

  vm && (vm.emitsOptions = emitsOptions);

  return {
    bridgedEvents
  };
};
