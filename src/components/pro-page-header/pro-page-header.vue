<template>
  <view
    class="hx-page-header page-pt-with-navbar hx-z-[1] hx-h-[176px] hx-bg-[length:100%_100%] hx-bg-no-repeat"
    :style="headerStyle"
  >
    <slot>
      <view v-if="showInput" class="hx-pl-[16px] hx-pr-[16px] hx-mb-[4px]">
        <pro-input prefix-icon="/static/local/search-icon.png" />
      </view>
    </slot>

    <slot name="bottom">
      <view v-if="showTabList" class="hx-p-[2px_4px]">
        <pro-tabs
          :current="tabIndex"
          :list="tabList"
          @change="handleTabChange"
        />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  tabIndex: {
    type: Number,
    default: 0
  },
  tabList: {
    type: Array as PropType<{ name: string }[]>,
    default: () => []
  },
  bgImgUrl: {
    type: String,
    default: null
  },
  showInput: {
    type: Boolean,
    default: true
  },
  showTabList: {
    type: Boolean,
    default: true
  },
  showCondition: Boolean
});
const emits = defineEmits(['tab-change']);

const headerStyle = computed(() => {
  const { bgImgUrl } = props;
  return {
    backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : 'unset'
  };
});

const handleTabChange = (...args: unknown[]) => {
  emits('tab-change', ...args);
};
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true
  }
};
</script>

<style scoped>
.hx-page-header {
  box-shadow: 0px 6px 6px 0px rgba(0, 33, 81, 0.03);
}
</style>
