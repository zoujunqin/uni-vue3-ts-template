import { upperFirst } from 'lodash-es';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

interface VM extends ComponentInternalInstance {
  emitsOptions?: Record<string, null>;
}

export const useBridgedEmits = (
  eventNames: string[] = [],
  onPrefix: string = ''
) => {
  let bridgedEvents = {};

  const executor = () => {
    const vm: VM | null = getCurrentInstance();
    const emitsOptions = vm?.emitsOptions || {};
    const _emit =
      // @ts-ignore
      vm?.emit || vm?.$emit?.bind(vm) || vm?.proxy?.$emit?.bind(vm?.proxy);

    bridgedEvents = eventNames.reduce(
      (eventAttrs: Record<string, any>, eventName: string) => {
        emitsOptions[onPrefix ? onPrefix + upperFirst(eventName) : eventName] =
          null;

        eventAttrs['on' + upperFirst(eventName)] = (...args: unknown[]) => {
          _emit(
            onPrefix ? onPrefix + upperFirst(eventName) : eventName,
            ...args
          );
        };
        return eventAttrs;
      },
      {}
    );

    vm && (vm.emitsOptions = emitsOptions);
  };

  if (onPrefix) {
    executor();
  } else {
    /* #ifndef H5 || APP-PLUS || APP-PLUS-NVUE || APP-NVUE */
    executor();
    /* #endif */
  }

  return { bridgedEvents };
};
