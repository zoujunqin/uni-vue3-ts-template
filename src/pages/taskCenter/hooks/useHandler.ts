import { shallowRef } from 'vue';

import { ITask, getTaskList } from '@/api/fe/wechat/task_center';
import ProScrollList from '@/components/ProScrollList/ProScrollList.vue';
import { TASK_STATUS } from '@/constant/taskDetail';
import { getUUID } from '@/utils';

export const useHandler = () => {
  const componentKey = shallowRef(getUUID());
  const tabList = [
    {
      fetch: getTaskList,
      name: '待确认',
      type: TASK_STATUS.WAIT_CONFIRM
    },
    {
      fetch: getTaskList,
      name: '承接中',
      type: TASK_STATUS.ACCEPTED
    },
    {
      fetch: getTaskList,
      name: '已完结',
      type: TASK_STATUS.COMPLETED
    }
  ];

  const proScrollListRef =
    shallowRef<Array<InstanceType<typeof ProScrollList>>>();
  const inputSearchValue = shallowRef('');

  const confirmedInputSearchValue = shallowRef('');
  const handleInputConfirm = (value: string, tabIndex: number) => {
    confirmedInputSearchValue.value = value;
    proScrollListRef.value?.[tabIndex]?.reload();
  };

  const handleInputBlur = () => {
    inputSearchValue.value = confirmedInputSearchValue.value;
  };

  /* 拓展参数：tab的类型以及搜索值 */
  const getExtendParams = (type: string) => {
    return {
      status: type,
      taskName: confirmedInputSearchValue.value
    };
  };

  const navToTaskDetail = (row: ITask) => {
    uni.navigateTo({
      url: `/pagesTask/taskDetail/index?id=${row.taskId}`
    });
  };

  return {
    proScrollListRef,
    inputSearchValue,
    componentKey,
    tabList,
    navToTaskDetail,
    handleInputConfirm,
    handleInputBlur,
    getExtendParams
  };
};
