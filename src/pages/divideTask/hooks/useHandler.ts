import { shallowRef } from 'vue';
import { onPullDownRefresh } from '@dcloudio/uni-app';

export const useHandler = () => {
  /* 行业类型 */
  const industryList = shallowRef([]);
  const industryDropDownPopupRef = shallowRef();
  const openIndustryPopup = (val: boolean) => {
    industryDropDownPopupRef.value[val ? 'open' : 'close']();
    proAreaPickerRef.value.close();
  };

  /* 地区选择 */
  const areaList = shallowRef([]);
  const proAreaPickerRef = shallowRef();
  const openAreaPicker = (val: boolean) => {
    proAreaPickerRef.value[val ? 'open' : 'close']();
    industryDropDownPopupRef.value.close();
  };

  /* 条件 */
  const conditionActive = shallowRef('');
  const handlePopupChange = ({ show }: { show: boolean }) => {
    !show && (conditionActive.value = '');
  };
  const handleAreaPickerClose = () => {
    conditionActive.value = '';
  };

  /* 下拉刷新 */
  onPullDownRefresh(() => {});

  /* 输入框搜索 */
  const handleInputConfirm = () => {};

  /* 跳转到任务详情 */
  const navToTaskDetail = () => {
    uni.navigateTo({
      url: '/pages/task/taskDetail/index'
    });
  };

  return {
    industryList,
    industryDropDownPopupRef,
    openIndustryPopup,

    areaList,
    proAreaPickerRef,
    openAreaPicker,

    conditionActive,
    handlePopupChange,
    handleAreaPickerClose,

    navToTaskDetail,
    handleInputConfirm
  };
};
