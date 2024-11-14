import { getCurrentInstance, onMounted, ref } from 'vue';

export const useFakerRef = () => {
  const instance = ref();

  onMounted(() => {
    getCurrentInstance().props['refer'] = instance.value;
  });

  return { instance };
};
