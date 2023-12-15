import { ExtractPropTypes, onMounted, shallowRef, toRef } from 'vue';

import { scrollListProps } from '../props';

import { useFirst } from '@/hooks/useFirst';

export const useHandler = (props: ExtractPropTypes<typeof scrollListProps>) => {
  const zPagingRef = shallowRef();
  const dataList = shallowRef([]);

  const handleQuery = (page: number, pageSize: number) => {
    const params = Object.assign({ page, pageSize }, props.extendParams);

    props.fetch(params).then((data: any) => {
      const { records = [], total = 0 } = data;
      zPagingRef.value.complete(records, total);
    });
  };

  onMounted(() => {
    useFirst(
      toRef(props, 'initialIndex'),
      toRef(props, 'currentIndex'),
      zPagingRef.value.reload
    );
  });

  return {
    zPagingRef,
    dataList,
    handleQuery
  };
};
