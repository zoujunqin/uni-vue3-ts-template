import { useAreaStore } from './modules/area';
import { useLoadingStore } from './modules/loading';
import { useUserStore } from './modules/user';

const userStore = useUserStore();
const areaStore = useAreaStore();
const loadingStore = useLoadingStore();
export function clearStore() {
  userStore.$reset();
  areaStore.$reset();
  loadingStore.$reset();
}
