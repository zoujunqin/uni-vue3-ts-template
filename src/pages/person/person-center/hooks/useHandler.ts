import { shallowRef } from 'vue';

export const useHandler = () => {
  const contactModalRef = shallowRef();
  const logoutModalRef = shallowRef();

  const panelItemMap = {
    personInfo: {
      type: 'personInfo',
      handler: () => {
        uni.showToast({ title: '功能待开发', icon: 'none' });
      }
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
    share: {
      type: 'share',
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
  const handleLogoutConfirm = () => {};

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
