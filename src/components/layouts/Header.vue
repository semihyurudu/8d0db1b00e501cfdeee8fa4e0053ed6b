<template>
  <header class="px-8 py-4 bg-blue-900 text-white">
    <div class="flex justify-between items-center">

      <Logo />

      <button class="bg-white hover:bg-gray-100 text-blue-900 font-bold py-1 px-2 rounded text-sm" @click="newReservation">
        Yeni Rezervasyon Yap
      </button>

    </div>
  </header>
</template>

<script>
import Logo from "@/components/partials/Logo";

export default {
  name: "Header",

  components: {
    Logo
  },

  methods: {
    newReservation() {
      localStorage.removeItem('step')
      localStorage.removeItem('hotelInformation')
      localStorage.removeItem('reservationId')
      this.$store.dispatch('resetFields')


      if(this.$route.name === 'home') {
        location.reload()
      } else {
        this.$router.push({name: 'home'})
      }
    }
  }
}
</script>