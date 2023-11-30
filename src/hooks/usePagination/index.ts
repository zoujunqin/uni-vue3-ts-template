import { shallowRef } from 'vue';

export const usePagination = ({ pageSize = 10 }, params) => {
  const page = shallowRef(1);

  const load = () => {};

  const refresh = () => {};

  const reload = () => {};

  return {
    load,
    reload,
    refresh
  };
};
