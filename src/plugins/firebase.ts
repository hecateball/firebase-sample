import {
  App,
  Plugin,
  InjectionKey,
  Ref,
  ref,
  readonly,
  provide,
  inject,
} from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'

const CurrentUser: InjectionKey<Ref<firebase.User | null>> = Symbol()

export const firebaseInit: Plugin = {
  install(app: App, ...options: any[]) {
    if (firebase.apps.length !== 0) {
      return
    }
    firebase.initializeApp(options[0])
  },
}

export const provideCurrentUser = () => {
  const currentUser = ref<firebase.User | null>(null)
  firebase.auth().onAuthStateChanged((user) => {
    currentUser.value = user
  })
  provide(CurrentUser, readonly(currentUser))
}

export const useCurrentUser = () => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) {
    throw new Error('currentUser is not provided')
  }
  return currentUser
}
