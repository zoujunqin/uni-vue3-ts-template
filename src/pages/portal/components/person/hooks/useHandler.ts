import { shallowRef } from 'vue';

import { clearStore } from '@/pinia/index';
import { useUserStore } from '@/pinia/modules/user';
import { useRouter } from '@/router/router';

export const useHandler = () => {
  const contactModalRef = shallowRef();
  const logoutModalRef = shallowRef();

  const panelItemMap = {
    personInfo: {
      type: 'personInfo',
      handler: () => {}
    },
    bankCard: {
      type: 'bankCard',
      handler: () => {}
    },
    contract: {
      type: 'contract',
      handler: () => {}
    },
    myInsurance: {
      type: 'myInsurance',
      handler: () => {}
    }
  } as const;

  const verticalListItemMap = {
    remuneration: {
      type: 'remuneration',
      handler: () => {}
    },
    agreement: {
      type: 'agreement',
      handler: () => {}
    },
    contact: {
      type: 'contact',
      handler: () => {
        contactModalRef.value.open();
      }
    }
  } as const;
  const logout = () => {
    logoutModalRef.value.open();
  };

  /* 确认退出登录 */
  const handleLogoutConfirm = () => {
    clearStore();
    logoutModalRef.value.close();
  };

  /* 联系我们 - 拨打电话 */
  const handleContactConfirm = (phoneNumber: string) => {
    uni.makePhoneCall({ phoneNumber });
  };

  const handleToLoginPage = () => {
    if (!useUserStore().token) {
      const { router } = useRouter();
      router.push({ name: 'Login' });
    }
  };

  return {
    logout,
    handleLogoutConfirm,
    handleContactConfirm,
    contactModalRef,
    logoutModalRef,
    panelItemMap,
    verticalListItemMap,

    handleToLoginPage
  };
};
