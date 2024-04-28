<template>
  <view class="hx-h-full hx-overflow-auto">
    <ProNavbar
      v-if="showNavbar"
      :style="navbarStyle"
      :text="navbarTitle"
      :showBack="showBack"
      @navBack="handleNavBack"
    />

    <slot />
  </view>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  showNavbar: Boolean,
  navbarTitle: {
    type: String,
    default: '导航栏'
  },
  navbarVisibility: {
    type: String,
    default: 'unset'
  },
  showBack: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['pageBack']);

const navbarStyle = computed(() => {
  return {
    visibility: props.navbarVisibility
  };
});
const handleNavBack = () => {
  emit('pageBack');
};
</script>

<script lang="ts">
export default { options: { name: 'ProPage', virtualHost: true } };
</script>
