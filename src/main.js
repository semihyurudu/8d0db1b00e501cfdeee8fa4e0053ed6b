import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import './assets/tailwind.css'
import VueConfirmDialog from 'vue-confirm-dialog'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarAlt,
  faBed,
  faCreditCard,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCalendarCheck,
  faCalendarTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueMask from 'v-mask'
Vue.use(VueMask);

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

library.add(faCalendarAlt, faBed, faCreditCard, faAngleDoubleLeft, faAngleDoubleRight, faCalendarCheck, faCalendarTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
