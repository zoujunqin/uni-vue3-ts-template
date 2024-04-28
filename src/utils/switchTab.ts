import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { getAreaTreeProvinceCityDistrict } from '@/api/system/area';
import { PROTOCOL_TYPE } from '@/constant/taskDetail';
import pagesJson from '@/pages.json';
import { useTabbarStore } from '@/pinia/modules/tabbar';
import { useUserStore } from '@/pinia/modules/user';
import { dealStepCurrent } from '@/utils/index';
import { setArea } from '@/utils/user';

export const switchFirstTab = () => {
  const tabbarStore = useTabbarStore();
  const { switchTabbar } = tabbarStore;
  switchTabbar(pagesJson.tabBar.list[0].pagePath);
};

export const loginJumpPage = () => {
  const { getUserCodeID } = useUserStore();
  const codeId = getUserCodeID();
  if (codeId === '-1') {
    switchFirstTab();
  } else {
    handleGetInvitationCodeScan(codeId);
  }
};
export const handleGetInvitationCodeScan = codeId => {
  getInvitationCodeScan(codeId)
    .then(res => {
      const current = dealStepCurrent(res);
      if (current === -1) {
        switchFirstTab();
      } else {
        const taskQueryParams = {
          invitationCodeId: codeId,
          current: current,
          sourceType: PROTOCOL_TYPE.INVITATION_CODE
        };
        uni.reLaunch({
          url: `/pagesAuth/realName/index?taskQueryParams=${JSON.stringify(
            taskQueryParams
          )}`
        });
      }
    })
    .catch(err => {
      setTimeout(() => {
        uni.showToast({
          title: err.response.data.message,
          duration: 3000,
          icon: 'none'
        });
      }, 1000);
      switchFirstTab();
    });
};
export const handleGetArea = () => {
  getAreaTreeProvinceCityDistrict().then(res => {
    setArea(JSON.stringify(res));
  });
};
