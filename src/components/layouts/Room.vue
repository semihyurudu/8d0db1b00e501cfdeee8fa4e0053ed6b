<template>
  <main>
    <div class="container mx-auto">
      <Steps />

      <div class="bg-gray-200 p-6 rounded-md my-5">
        <h2 class="text-xl font-bold mb-2">{{current.hotel_name}} <span class="text-md font-light">({{selected_hotel.city}})</span></h2>

        <div class="text-sm flex flex-col md:flex-row">
          <div class="md:mr-1 mb-1 md:mb-0"><span class="font-bold">Giriş Tarihi: </span> {{current.start_date}} <span class="hidden md:inline-block">-</span></div>
          <div class="md:mr-1 mb-1 md:mb-0"><span class="font-bold">Çıkış Tarihi: </span> {{current.end_date}} <span class="hidden md:inline-block">-</span></div>
          <div class="md:mr-1 mb-1 md:mb-0"><span class="font-bold">Yetişkin: </span> {{current.adult}} <span class="hidden md:inline-block">-</span></div>
          <div><span class="font-bold">Çocuk: </span> {{current.child}}</div>

        </div>
      </div>

      <div class="bg-gray-200 p-6 rounded-md flex justify-between">

        <router-link class="btn btn-sm btn-outline-secondary" :to="{name: 'home'}">
          <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm" @click="turnBack">
            <font-awesome-icon icon="angle-double-left" /> Geri
          </button>
        </router-link>

        <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm">
          Kaydet ve Devam Et <font-awesome-icon icon="angle-double-right" />
        </button>
      </div>

    </div>
  </main>
</template>

<script>
import Steps from "@/components/partials/Steps/Steps";
import {axiosInstance} from "@/plugins/services";
import { mapGetters } from "vuex"

export default {
  name: "Room",

  components: {
    Steps
  },

  computed: {
    ...mapGetters({
      selected_hotel: "selected_hotel"
    })
  },

  async mounted() {

    const result = await axiosInstance.get('/hotel-details');
    let hotelAndDate = JSON.parse(localStorage.getItem('hotelAndDate'))

    if(hotelAndDate === null) {
      await this.$router.push({name: 'home'})
      return false
    }

    await this.$store.dispatch('setHotelDetails', result.data)
    await this.$store.dispatch('setSelectedHotel', result.data.filter(x => x.id === hotelAndDate.hotel_id)[0])

    this.current = hotelAndDate

  },

  methods: {
    turnBack() {
      this.$store.dispatch('setStep', '1')
    }
  },

  data() {
    return {
      current: {}
    }
  }
}
</script>