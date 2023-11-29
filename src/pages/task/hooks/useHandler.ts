import { shallowRef } from 'vue';

export const useHandler = () => {
  const tabIndex = shallowRef(0);
  const handleTabChange = tab => {
    tabIndex.value = tab.index;
  };

  return {
    tabIndex,
    handleTabChange
  };
};
