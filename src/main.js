import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './weeks'
import 'animate.css'

const fb = require('./firebaseInit.js')

import 'bulma/css/bulma.css'
import 'bulma-extensions/bulma-switch/dist/bulma-switch.min.css'
import 'bulma-extensions/dist/bulma-extensions.min.css'
import Buefy from 'buefy'
Vue.use(Buefy)

import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';
import CheckIcon from "./components/CheckIcon.vue"
import Alert from "./components/Alert.vue"
import Pageloader from './components/Pageloader'
Vue.component('app-alert', Alert);
Vue.component('check-icon', CheckIcon);
Vue.component('app-modal', Modal);
Vue.component('app-navbar', Navbar);
Vue.component('app-footer', Footer);
Vue.component('app-pageloader',Pageloader);


import API from './components/API'
Vue.component('app-api',API);

//Local Storage Vue
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

Vue.config.productionTip = false


let app
fb.auth.onAuthStateChanged(user => {
  if(!app){
    app =  new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
