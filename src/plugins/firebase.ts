import { App, Plugin } from 'vue'
import firebase from 'firebase/app'

export const firebaseInit: Plugin = {
  install(app: App, ...options: any[]) {
    if (firebase.apps.length !== 0) {
      return
    }
    firebase.initializeApp(options[0])
  },
}
