import { InjectionKey, ShallowRef } from 'vue';

export const provideKey: InjectionKey<{
  animate: ShallowRef<Boolean>;
  loading: ShallowRef<Boolean>;
}> = Symbol();
