import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import { useUserStore } from '@/pinia/modules/user';

export const useTokenWatch = ({ hasTokenCb, noTokenCb }) => {
  const { token } = storeToRefs(useUserStore());

  watch(token, newToken => {
    if (newToken) {
      hasTokenCb?.();
    } else {
      noTokenCb?.();
    }
  });
};
