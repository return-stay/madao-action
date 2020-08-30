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
    redirect: '/activity-home'
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
  }
]

const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
