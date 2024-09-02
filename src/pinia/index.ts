import { useAreaStore } from './modules/area';
import { useLoadingStore } from './modules/loading';
import { useUserStore } from './modules/user';

export function clearStore() {
  const userStore = useUserStore();
  const areaStore = useAreaStore();
  const loadingStore = useLoadingStore();
  userStore.$reset();
  areaStore.$reset();
  loadingStore.$reset();
}
