import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/components/layouts/HomePage")
    },
    {
      path: "/room",
      name: "room",
      component: () => import("@/components/layouts/RoomPage")
    },
    {
      path: "/payment",
      name: "payment",
      component: () => import("@/components/layouts/PaymentPage")
    },
    {
      path: "/success",
      name: "success",
      component: () => import("@/components/layouts/SuccessPage")
    }
  ]
});
