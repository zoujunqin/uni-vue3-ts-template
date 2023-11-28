import { shallowRef } from 'vue';

export const useHandler = () => {
  const proModalRef = shallowRef();

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
      handler: () => {}
    }
  } as const;

  const logout = () => {
    proModalRef.value.open();
    // uni.showModal({ icon: 'none', mask: true, showCancel: false });
  };

  return {
    logout,
    proModalRef,
    panelItemMap,
    verticalListItemMap
  };
};
