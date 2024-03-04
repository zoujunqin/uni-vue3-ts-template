import { getInvitationCodeScan } from '@/api/fe/wechat/invitation_code';
import { getAreaTreeProvinceCityDistrict } from '@/api/system/area';
import pagesJson from '@/pages.json';
import { useTabbarStore } from '@/pinia/modules/tabbar';
import { dealStepCurrent } from '@/utils/index';
import { getInvitationCodeId, setArea } from '@/utils/user';

export const switchFirstTab = () => {
  const tabbarStore = useTabbarStore();
  const { switchTabbar } = tabbarStore;
  switchTabbar(pagesJson.tabBar.list[0].pagePath);
};

export const loginJumpPage = () => {
  handleGetArea();
  const codeId = getInvitationCodeId();
  if (codeId === '-1') {
    switchFirstTab();
  } else {
    getInvitationCodeScan(codeId).then(res => {
      const current = dealStepCurrent(res);
      uni.reLaunch({
        url: `/pagesAuth/realName/index?current=${current}`
      });
    });
  }
};

export const handleGetArea = () => {
  getAreaTreeProvinceCityDistrict().then(res => {
    setArea(JSON.stringify(res));
  });
};
