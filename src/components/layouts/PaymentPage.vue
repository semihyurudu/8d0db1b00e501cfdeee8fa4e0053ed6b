<template>
  <main>
    <div class="container mx-auto">
      <Steps />

      <div class="flex flex-col lg:flex-row">
        <div class="p-6 border border-gray-200 rounded-md my-5 w-full lg:w-1/2 lg:mr-5">
          <CreditCard :card="card" />
        </div>
        <div class="bg-gray-200 rounded-md p-6 rounded-md my-5 w-full lg:w-1/2">
          <PaymentPreview :current="current" v-if="current.hotel_id" />
        </div>
      </div>

      <div class="bg-gray-200 p-6 rounded-md flex justify-between">

        <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm" @click="turnBack">
          <font-awesome-icon icon="angle-double-left" /> Geri
        </button>

        <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm" @click="checkForm">
          Kaydet ve Devam Et <font-awesome-icon icon="angle-double-right" />
        </button>
      </div>

    </div>
  </main>
</template>

<script>
import { axiosInstance } from "@/plugins/services";
import Steps from "@/components/partials/Steps/Steps";
import CreditCard from "@/components/partials/CreditCard"
import PaymentPreview from "@/components/partials/PaymentPreview"

export default {
  name: "PaymentPage",

  components: {
    Steps,
    CreditCard,
    PaymentPreview
  },

  async mounted() {
    const result = await axiosInstance.get('/hotel-details');
    let hotelInformation = JSON.parse(localStorage.getItem('hotelInformation'))
    let step = localStorage.getItem('step')

    if(hotelInformation === null) {
      await this.$router.push({name: 'home'})
      return false
    }

    if(parseInt(step) === 2) {
      await this.$router.push({name: 'home'})
      return false
    }

    await this.$store.dispatch('setHotelDetails', result.data)
    await this.$store.dispatch('setSelectedHotel', result.data.filter(x => x.id === hotelInformation.hotel_id)[0])
    await this.$store.dispatch('setSelectedRoom', hotelInformation.room_type)
    await this.$store.dispatch('setSelectedScenic', hotelInformation.room_scenic)

    this.current = hotelInformation
  },

  data() {
    return {
      current: {},
      card: {
        card_number: "",
        card_name: "",
        card_month: "",
        card_year: "",
        card_cvv: ""
      }
    }
  },

  methods: {
    turnBack() {
      this.$store.dispatch('setStep', '2')
      this.$router.push({name: 'room'})
    },

    checkForm() {
      console.log('here')
    }
  }
}
</script>