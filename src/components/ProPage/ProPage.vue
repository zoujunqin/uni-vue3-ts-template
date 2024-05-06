<template>
  <view class="hx-h-full hx-overflow-auto">
    <ProNavbar
      v-if="showNavbar"
      :showBack="showBack"
      :text="navbarTitle"
      @navBack="handleNavBack"
    />

    <slot />

    <ProLoading />
  </view>
</template>
<script lang="ts" setup>
defineProps({
  showNavbar: Boolean,
  navbarTitle: {
    type: String,
    default: '导航栏'
  },
  showBack: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(['pageBack']);

const handleNavBack = () => {
  emit('pageBack');
};
</script>

<script lang="ts">
export default { options: { name: 'ProPage', virtualHost: true } };
</script>
