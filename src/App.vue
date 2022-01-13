<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },

  mounted() {
    let step = parseInt(localStorage.getItem('step'))

    this.$store.dispatch('setStep', step)

    switch (step) {
      case 1:
        this.$router.push({name: 'home'})
        break;
      case 2:
        this.$router.push({name: 'room'})
        break;
      case 3:

        break;
    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
main {
  min-height: calc(100vh - 141px);
  padding: 20px
}

@media (min-width: 1024px) {
  main {
    padding: 50px
  }
}

</style>
