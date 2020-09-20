import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue,BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router';
import './Style/main.scss'
import {store} from './store/index.js';
import vuetify from './plugins/vuetify';
import DateFilter from './Filter/Date';
import * as firebase from 'firebase';
Vue.config.productionTip = false

import EditMeeting from './components/Meetup/EditDialogue/EditMeetupDetailsDialogue.vue'
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.component("edit-meeting",EditMeeting)

Vue.filter('date',DateFilter);
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyChPonk9WAymPdDfh4Fh96azAsm_xBzLB0",
      authDomain: "devmeetup-3cde6.firebaseapp.com",
      databaseURL: "https://devmeetup-3cde6.firebaseio.com",
      projectId: "devmeetup-3cde6",
      storageBucket: "devmeetup-3cde6.appspot.com",
      messagingSenderId: "656857785325",
      appId: "1:656857785325:web:4adc0f4519d67d746b7de4",
      measurementId: "G-DXE21S4Y7G"
    })
    firebase.auth().onAuthStateChanged(user =>{ 
      if(user)
      {
        const newUser = {id:user.uid,loadMeetups:[]}
        this.$store.dispatch("autoSignIn",newUser);
      }
      else
      {
          this.$router.push('/')
      }
    })
    this.$store.dispatch("getMeetupsFromFirebase");
  },
}).$mount('#app')
