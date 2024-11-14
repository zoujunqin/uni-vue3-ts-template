#### 项目使用自定义路由，模拟 vue-router 行为， 但不完全实现。小程序首页加载无法拦截（h5可以），h5的前进后退无法拦截
#### 使用 navigator 组件跳转的无法进行路由拦截，最好不要用

- push
```vue
import { useRouter } from ‘@/router/router’ 
const router = useRouter()
router.push({ name: 'Portal', query: {} })
router.push({ path: '/pages/portal/index', query: {} })
```

- back
```vue
import { useRouter } from ‘@/router/router’
const router = useRouter()
router.back(1)
router.back(2)
```

- replace
```vue
import { useRouter } from ‘@/router/router’ 
const router = useRouter()
router.replace({ name: 'Portal', query: {} })
router.replace({ path: '/pages/portal/index', query: {} })
```

- reLaunch | replaceAll
```vue
import { useRouter } from ‘@/router/router’
const router = useRouter()
router.reLaunch({ name: 'Portal', query: {} })
router.replaceAll({ path: '/pages/portal/index', query: {} })
```