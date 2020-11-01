import { App, Plugin } from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const firebaseInit: Plugin = {
  install(app: App, ...options: any[]) {
    if (firebase.apps.length !== 0) {
      return
    }
    firebase.initializeApp(options[0])
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV !== 'production') {
      firebase.auth().useEmulator('http://localhost:9099/')
      firebase.firestore().settings({
        host: 'localhost:8080',
        ssl: false,
      })
    }
  },
}
