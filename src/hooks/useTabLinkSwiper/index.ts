import { shallowRef } from 'vue';

export const useTabLinkSwiper = () => {
  const tabIndex = shallowRef(0);
  const swiperIndex = shallowRef(0);

  const handleTabChange = (tab: { index: number }) =>
    (swiperIndex.value = tab.index);
  const handleSwiperChange = (swiper: { detail: { current: number } }) =>
    (tabIndex.value = swiper.detail.current);

  const tabProps = {
    tabIndex,
    onChange: handleTabChange
  };
  const swiperProps = {
    swiperIndex,
    onChange: handleSwiperChange
  };

  const resetIndex = () => {
    tabIndex.value = 0;
    swiperIndex.value = 0;
  };

  return {
    tabProps,
    swiperProps,
    tabIndex,
    swiperIndex,
    resetIndex,
    handleTabChange,
    handleSwiperChange
  };
};
