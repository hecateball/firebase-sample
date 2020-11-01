import { createRouter, createWebHistory, NavigationGuard } from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
const Index = () => import('/@/pages/Index.vue')
const SignUp = () => import('/@/pages/sign-up/Index.vue')
const SignIn = () => import('/@/pages/sign-in/Index.vue')
const Members = () => import('/@/pages/members/Index.vue')
const Create = () => import('/@/pages/members/create/Index.vue')

const authenticationRequired: NavigationGuard = async (to, from, next) => {
  const currentUser = await new Promise<firebase.User | null>((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    })
  })
  if (currentUser === null) {
    next({ name: 'sign-in' })
    return
  }
  next()
}

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/sign-up', name: 'sign-up', component: SignUp },
    { path: '/sign-in', name: 'sign-in', component: SignIn },
    {
      path: '/members',
      name: 'members',
      component: Members,
      beforeEnter: authenticationRequired,
    },
    {
      path: '/members/create',
      name: 'members-create',
      component: Create,
      beforeEnter: authenticationRequired,
    },
  ],
})
