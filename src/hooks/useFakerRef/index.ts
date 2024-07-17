import { ShallowRef, getCurrentInstance } from 'vue';

import { useVModel } from '@/hooks/useVModel/index';

export const useFakerRef = () => {
  const currentInstance = getCurrentInstance();
  const instance = useVModel(currentInstance.props, 'refer', undefined, {
    passive: true
  }) as ShallowRef<any>;
  return { instance };
};
