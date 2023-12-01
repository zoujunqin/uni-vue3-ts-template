import { shallowRef } from 'vue';

export const useInputHandler = () => {
  const inputValue = shallowRef('');

  return {
    inputValue
  };
};
