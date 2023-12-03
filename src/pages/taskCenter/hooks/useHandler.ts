import { getAddedMemberList } from '@/api/test';
import { getUUID } from '@/utils';

export const useHandler = () => {
  const componentKey = getUUID();
  const tabList = [
    {
      fetch: getAddedMemberList,
      name: '待确认'
    },
    {
      fetch: getAddedMemberList,
      name: '承接中'
    },
    {
      fetch: getAddedMemberList,
      name: '已完结'
    }
  ];

  const handleInputConfirm = () => {};

  const navToTaskDetail = row => {
    uni.navigateTo({
      url: '/pages/task/taskDetail/index'
    });
  };

  return {
    componentKey,
    tabList,
    navToTaskDetail,
    handleInputConfirm
  };
};
