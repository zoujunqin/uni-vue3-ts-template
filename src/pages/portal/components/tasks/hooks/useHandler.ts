import { shallowRef } from 'vue';

import { ITask, getTaskList } from '@/api/fe/wechat/task_center';
import ProPageHeader from '@/components/ProPageHeader/ProPageHeader.vue';
import ProScrollList from '@/components/ProScrollList/ProScrollList.vue';
import { TASK_STATUS, PROTOCOL_TYPE } from '@/constant/taskDetail';
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
  const proPageHeaderRef = shallowRef<InstanceType<typeof ProPageHeader>>();

  const confirmedInputSearchValue = shallowRef('');
  const handleInputConfirm = (value: string, tabIndex: number) => {
    confirmedInputSearchValue.value = value;
    proScrollListRef.value?.[tabIndex]?.reload();
  };

  /* 拓展参数：tab的类型以及搜索值 */
  const getExtendParams = (type: string) => {
    return {
      status: type,
      taskName: confirmedInputSearchValue.value
    };
  };

  const navToTaskDetail = (row: ITask) => {
    const params = {
      taskId: row.taskId,
      orderDetailId: row.orderDetailId,
      sourceType: PROTOCOL_TYPE.ORDER_DETAIL
    };
    uni.navigateTo({
      url: `/pagesTask/taskDetail/index?params=${JSON.stringify(params)}`
    });
  };

  return {
    proPageHeaderRef,
    proScrollListRef,
    componentKey,
    tabList,
    navToTaskDetail,
    handleInputConfirm,
    getExtendParams
  };
};
