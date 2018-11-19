import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/home', component: 'Home', meta: { requiresAuth: true } },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  // TODO: Find proper way to enable history mode
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
