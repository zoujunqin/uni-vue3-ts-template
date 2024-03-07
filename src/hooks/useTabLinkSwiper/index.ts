import { shallowRef } from 'vue';

export const useTabLinkSwiper = () => {
  const tabIndex = shallowRef(0);
  const swiperIndex = shallowRef(0);

  const handleTabChange = (tab: { index: number }) => {
    swiperIndex.value = tab.index;
    tabIndex.value = swiperIndex.value;
  };
  const handleSwiperChange = (swiper: { detail: { current: number } }) => {
    tabIndex.value = swiper.detail.current;
    swiperIndex.value = tabIndex.value;
  };

  const tabProps = {
    tabIndex,
    onChange: handleTabChange
  };
  const swiperProps = {
    swiperIndex,
    onChange: handleSwiperChange
  };

  return {
    tabProps,
    swiperProps,
    tabIndex,
    swiperIndex,
    handleTabChange,
    handleSwiperChange
  };
};
