import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/special-topic'
  // },
  {
    path: '/',
    redirect: '/unicom365'
  },
  {
    path: '/activity-home',
    component: () => import('@/views/share/ActivityHome'),
    name: 'ActivityHome'
  },
  {
    path: '/invitation-gifts',
    component: () => import('@/views/share/InvitationGifts'),
    name: 'InvitationGifts'
  },
  {
    path: '/special-topic',
    component: () => import('@/views/share/SpecialTopic'),
    name: 'SpecialTopic'
  },
  {
    path: '/invaition-rule',
    component: () => import('@/views/share/InvaitionRule'),
    name: 'InvaitionRule'
  },
  {
    path: '/newGiftBag',
    component: () => import('@/views/share/InvaitionPage'),
    name: 'InvaitionPage'
  },
  // 联通365活动动
  {
    path: '/unicom365',
    component: () => import('@/views/unicoms/Unicom365'),
    name: 'Unicom365'
  },
  {
    path: '/order',
    component: () => import('@/views/unicoms/Order'),
    name: 'Order'
  },
  {
    path: '/conversion',
    component: () => import('@/views/unicoms/Conversion'),
    name: 'Conversion'
  },
]

const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
