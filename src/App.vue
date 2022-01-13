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
  padding: 50px
}
</style>
