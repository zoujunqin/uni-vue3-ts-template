import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import { useUserStore } from '@/pinia/modules/user';

export const useTokenWatch = callback => {
  const { token } = storeToRefs(useUserStore());

  watch(token, (newToken, oldToken) => {
    if (!oldToken && !!newToken) {
      callback();
    }
  });
};
