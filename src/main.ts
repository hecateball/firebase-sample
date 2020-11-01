import { createApp } from 'vue'
import { firebaseInit } from '/@/plugins/firebase'
import { currentUserProvider } from '/@/plugins/current-user'
import { router } from '/@/router'
import App from '/@/App.vue'
import '/@/assets/new.css'

createApp(App)
  .use(firebaseInit, {
    apiKey: 'AIzaSyDOYeAuekhLYfPvQyHS7eaNQ4J2G-HWEt8',
    authDomain: 'hoshimachi-studio.firebaseapp.com',
    databaseURL: 'https://hoshimachi-studio.firebaseio.com',
    projectId: 'hoshimachi-studio',
    storageBucket: 'hoshimachi-studio.appspot.com',
    messagingSenderId: '96795732381',
    appId: '1:96795732381:web:e492432a2ccd3c0f89a774',
    measurementId: 'G-0CGK3N66KS',
  })
  .use(currentUserProvider)
  .use(router)
  .mount('#app')
