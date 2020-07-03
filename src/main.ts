import { createApp } from 'vue'
import { firebaseInit } from '/@/plugins/firebase'
import { router } from '/@/router'
import App from '/@/App.vue'
import '/@/assets/new.css'

createApp(App)
  .use(firebaseInit, {
    apiKey: 'AIzaSyD83KgMCnT1GNumpojKybJlV2WnDRlFtEM',
    authDomain: 'shiodaifuku-io.firebaseapp.com',
    databaseURL: 'https://shiodaifuku-io.firebaseio.com',
    projectId: 'shiodaifuku-io',
    storageBucket: 'shiodaifuku-io.appspot.com',
    messagingSenderId: '875470404419',
    appId: '1:875470404419:web:aee8c38e72511426',
    measurementId: 'G-C66P2JVWL1',
  })
  .use(router)
  .mount('#app')
