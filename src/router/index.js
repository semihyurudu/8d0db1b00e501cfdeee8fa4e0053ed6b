import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/layouts/Home")
    },
    {
      path: "/room",
      name: "room",
      component: () => import("@/components/layouts/Room")
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("@/components/layouts/PaymentPage")
    }
  ]
});
