import { shallowRef } from 'vue';

import { clearStore } from '@/pinia/index';

export const useHandler = () => {
  const contactModalRef = shallowRef();
  const logoutModalRef = shallowRef();

  const panelItemMap = {
    personInfo: {
      type: 'personInfo',
      handler: () => {
        uni.navigateTo({
          url: '/pagesPerson/personMessage/index'
        });
      }
    },
    bankCard: {
      type: 'bankCard',
      handler: () => {
        uni.navigateTo({
          url: '/pagesPerson/bankCard/index'
        });
      }
    },
    contract: {
      type: 'contract',
      handler: () => {
        uni.navigateTo({
          url: '/pagesPerson/myContract/index'
        });
      }
    },
    myInsurance: {
      type: 'myInsurance',
      handler: () => {
        uni.navigateTo({
          url: '/pagesPerson/myInsurance/index'
        });
      }
    }
  } as const;

  const verticalListItemMap = {
    remuneration: {
      type: 'remuneration',
      handler: () => {
        uni.navigateTo({
          url: '/pagesPerson/remuneration/index'
        });
      }
    },
    agreement: {
      type: 'agreement',
      handler: () => {
        uni.navigateTo({
          url: '/pagesPerson/agreement/index'
        });
      }
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
    uni.reLaunch({
      url: '/pages/login/index'
    });
  };

  /* 联系我们 - 拨打电话 */
  const handleContactConfirm = (phoneNumber: string) => {
    uni.makePhoneCall({ phoneNumber });
  };

  return {
    logout,
    handleLogoutConfirm,
    handleContactConfirm,
    contactModalRef,
    logoutModalRef,
    panelItemMap,
    verticalListItemMap
  };
};
