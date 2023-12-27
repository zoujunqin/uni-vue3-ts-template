<template>
  <view
    class="hx-page-header page-pt-with-navbar hx-z-[1] hx-h-[176px] hx-bg-[length:100%_100%] hx-bg-no-repeat"
    :style="headerStyle"
  >
    <slot>
      <view
        @click="handleInputClick"
        v-if="showInput"
        class="hx-pl-[16px] hx-pr-[16px] hx-mb-[4px]"
      >
        <ProInput
          v-model="inputSearchValue"
          class="hx-bg-[#f7f8fa]"
          v-bind="{
            ...$attrs,
            ...inputBridgedEvents,
            onConfirm: handleInputConfirm,
            onBlur: handleInputBlur
          }"
        >
          <template #prefix>
            <image
              class="hx-w-[18px] hx-h-[18px] hx-mt-[4px]"
              src="/static/search-icon.png"
            />
          </template>
        </ProInput>
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
import { computed, shallowRef } from 'vue';

import { pageHeaderProps } from './props';

import { uvEvents as uvInputEvents } from '@/components/ProInput/events';
import { uvEvents as uvTabsEvents } from '@/components/ProTabs/events';
import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useVModel } from '@/hooks/useVModel';

const props = defineProps(pageHeaderProps);

const emit = defineEmits(['confirm', 'blur', 'inputClick']);
const inputSearchValue = useVModel(props, 'modelValue', undefined, {
  passive: true
});
const confirmedInputValue = shallowRef('');
const handleInputConfirm = () => {
  confirmedInputValue.value = inputSearchValue.value;
  emit('confirm', confirmedInputValue.value);
};
const handleInputClick = () => {
  emit('inputClick');
};
const handleInputBlur = () => {
  inputSearchValue.value = confirmedInputValue.value;
  emit('blur');
};
const clearInput = () => {
  inputSearchValue.value = '';
};

const { bridgedEvents: inputBridgedEvents } = useBridgedEmits(
  uvInputEvents,
  'input'
);
const { bridgedEvents: tabBridgedEvents } = useBridgedEmits(
  uvTabsEvents,
  'tab'
);

const headerStyle = computed(() => {
  const { bgImgUrl } = props;
  return { backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : 'unset' };
});

defineExpose({ clearInput });
</script>

<style scoped>
.hx-page-header {
  box-shadow: 0 6px 6px 0 rgb(0 33 81 / 3%);
}
</style>

<script lang="ts">
export default { options: { name: 'ProPageHeader', virtualHost: true } };
</script>
