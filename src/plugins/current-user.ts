import { App, Plugin, ref, readonly } from 'vue'
import { CurrentUser } from '/@/compositions/users'
import firebase from 'firebase/app'
import 'firebase/auth'

export const currentUserProvider: Plugin = {
  install(app: App) {
    // Provide Current User
    const currentUser = ref<firebase.User | null>(null)
    firebase.auth().onAuthStateChanged((user) => {
      currentUser.value = user
    })
    app.provide(CurrentUser, {
      currentUser: readonly(currentUser),
    })
  },
}
