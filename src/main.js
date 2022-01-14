import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import './assets/tailwind.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt, faBed, faCreditCard, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCalendarAlt, faBed, faCreditCard, faAngleDoubleLeft, faAngleDoubleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
    return value;
  }
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatter.format(value);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
