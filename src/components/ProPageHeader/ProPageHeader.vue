<template>
  <view
    class="hx-page-header page-pt-with-navbar hx-z-[1] hx-h-[176px] hx-bg-[length:100%_100%] hx-bg-no-repeat"
    :style="headerStyle"
  >
    <slot>
      <view v-if="showInput" class="hx-pl-[16px] hx-pr-[16px] hx-mb-[4px]">
        <ProInput
          class="hx-bg-[#f7f8fa]"
          v-model="inputValue"
          prefix-icon="/static/local/search-icon.png"
          v-bind="{ ...$attrs, ...inputBridgedEvents }"
        />
      </view>
    </slot>

    <slot name="bottom">
      <view v-if="showTabList" class="hx-p-[2px_4px]">
        <ProTabs
          v-bind="{ ...$attrs, ...tabBridgedEvents }"
          :current="tabIndex"
          :list="tabList"
        />
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { pageHeaderProps } from './props';
import { uvEvents as uvInputEvents } from '@/components/ProInput/events';
import { uvEvents as uvTabsEvents } from '@/components/ProTabs/events';
import { useInputHandler } from './hooks/useInputHnadler';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';

const props = defineProps(pageHeaderProps);
const { bridgedEvents: inputBridgedEvents } = useBridgedEmits(
  uvInputEvents,
  'input'
);
const { bridgedEvents: tabBridgedEvents } = useBridgedEmits(
  uvTabsEvents,
  'tab'
);

const { inputValue } = useInputHandler();

const headerStyle = computed(() => {
  const { bgImgUrl } = props;
  return { backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : 'unset' };
});
</script>

<style scoped>
.hx-page-header {
  box-shadow: 0 6px 6px 0 rgba(0, 33, 81, 0.03);
}
</style>

<script lang="ts">
export default { options: { virtualHost: true } };
</script>
