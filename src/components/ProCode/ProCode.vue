<template>
  <view class="hx-h-full hx-flex hx-items-center">
    <uv-code
      ref="uvCodeRef"
      v-bind="{ ...$attrs, ...bridgedEvents, onChange: handleChange }"
    />

    <ProButton v-if="!props.text" v-bind="props.buttonProps" @click="getCode">
      {{ buttonText }}
    </ProButton>
    <span
      v-else
      :class="[
        props.textClass,
        props.readonly ? 'hx-text-text-color-disable' : 'hx-text-color-primary',
        'hx-text-font-size-base hx-font-[400] hx-leading-[21px]'
      ]"
      @click="getCode"
    >
      {{ buttonText }}
    </span>
  </view>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue';

import { uvEvents } from './events';
import { uvMethods } from './methods';

import { useBridgedEmits } from '@/hooks/useBridgedEmits';
import { useBridgedMethods } from '@/hooks/useBridgedMethods';
import { useFakerRef } from '@/hooks/useFakerRef';

const { bridgedEvents } = useBridgedEmits(uvEvents);

const props = defineProps({
  fetch: {
    type: Function,
    required: true,
    default: () => {}
  },
  validPhone: {
    type: Function,
    required: true,
    default: () => false
  },
  text: {
    type: Boolean,
    default: true
  },
  textClass: String,
  buttonProps: {
    type: Object,
    default: () => ({})
  },

  readonly: Boolean
});

const { instance: uvCodeRef } = useFakerRef();

const getCode = async () => {
  if (props.readonly) return;

  if (uvCodeRef.value.canGetCode && props.validPhone()) {
    await props.fetch();
    uvCodeRef.value.start();
  }
};

const buttonText = shallowRef('');
const handleChange = text => {
  buttonText.value = text;
};

const { bridgedMethods } = useBridgedMethods(uvMethods, uvCodeRef);

defineExpose(bridgedMethods);
</script>

<script lang="ts">
export default { options: { name: 'ProCode', virtualHost: true } };
</script>
