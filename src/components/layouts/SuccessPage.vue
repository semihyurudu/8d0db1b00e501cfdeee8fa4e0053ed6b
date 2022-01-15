<template>
  <main>
    <div class="container mx-auto" :class="[cancel_status && 'pointer-none']">

      <vue-confirm-dialog></vue-confirm-dialog>

      <div class="flex flex-col items-center border border-gray-200 p-6 rounded-md">
        <font-awesome-icon icon="calendar-check" class="text-green-600 text-6xl" v-if="!cancel_status" />
        <font-awesome-icon icon="calendar-times" class="text-red-600 text-6xl" v-else />

        <h1 class="font-semibold text-xl my-5">Rezervasyon kaydınız {{cancel_status ? 'iptal edilmiştir' : 'alınmıştır'}}.</h1>

        <template v-if="cancel_status">
          <div class="flex flex-col justify-center items-center">
            <span>
              Rezervasyonunuzu iptal ettiğiniz için üzgünüz! Yeni rezervasyon yapmak için aşağıdaki butonu kullanabilirsiniz.
            </span>

            <button
                type="button"
                class="bg-blue-900 hover:bg-blue-800 text-white font-bold p-4 rounded text-sm md:mr-3 mt-6"
                @click="newReservation"
            >
              Yeni Rezervasyon Yap
            </button>
          </div>
        </template>

        <template v-else>
          <span class="text-center">
            Rezervasyon özetiniz aşağıdaki gibidir.
          </span>
          <span class="text-center">
            Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.
          </span>

          <div class="mt-7 flex flex-col md:flex-row justify-center">

            <button
                type="button"
                class="bg-blue-900 hover:bg-blue-800 text-white font-bold p-4 rounded text-sm md:mr-3 mb-2 md:mb-0"
                @click="newReservation"
            >
              Yeni Rezervasyon Yap
            </button>

            <button
                type="button"
                class="bg-blue-900 hover:bg-blue-800 text-white font-bold p-4 rounded text-sm md:mr-3 mb-2 md:mb-0"
                @click="editReservation"
            >
              Rezervasyonu Güncelle
            </button>

            <button
                type="button"
                class="bg-blue-900 hover:bg-blue-800 text-white font-bold p-4 rounded text-sm"
                @click="deleteReservation"
            >
              Rezervasyonu İptal Et
            </button>

          </div>
        </template>


      </div>

      <div class="flex flex-col items-center bg-gray-200 p-6 rounded-md mt-4" v-if="!cancel_status">
        <PaymentPreview :current="current" v-if="current.hotel_id" page="success" />
      </div>

    </div>
  </main>
</template>

<script>

import PaymentPreview from "@/components/partials/PaymentPreview"
import {axiosInstance} from "@/plugins/services";
export default {
  name: "SuccessPage",

  components: {
    PaymentPreview
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
    },

    editReservation() {
      localStorage.setItem('step', '1')
      this.$store.dispatch('setStep', '1')

      this.$router.push({name: 'home'})
    },

    deleteReservation() {
      this.$confirm(
        {
          title: `Uyarı!`,
          message: `Rezervasyon kaydınızı iptal etmek istediğinize emin misiniz?`,
          button: {
            no: 'Hayır',
            yes: 'Evet'
          },
          callback: confirm => {
            if (confirm) {
              this.confirmDeleteReservation()
            }
          }
        }
      )
    },

    async confirmDeleteReservation() {
      const reservationId = localStorage.getItem('reservationId')
      const result = await axiosInstance.delete('/hotel-bookings/' + reservationId);

      if(result.data.id) {
        this.cancel_status = true
        localStorage.removeItem('reservationId')
      }
    }
  },

  data() {
    return {
      current: {},
      cancel_status: false
    }
  },

  async mounted() {
    let hotelInformation = JSON.parse(localStorage.getItem('hotelInformation'))

    if(hotelInformation === null) {
      await this.$router.push({name: 'home'})
      return false
    }

    if(!this.selected_hotel || !this.hotel_details.length) {
      const result = await axiosInstance.get('/hotel-details');

      await this.$store.dispatch('setHotelDetails', result.data)
      await this.$store.dispatch('setSelectedHotel', result.data.filter(x => x.id === hotelInformation.hotel_id)[0])
    }

    await this.$store.dispatch('setSelectedRoom', hotelInformation.room_type)
    await this.$store.dispatch('setSelectedScenic', hotelInformation.room_scenic)

    if(hotelInformation.coupon_code && hotelInformation.discount_amount) {
      await this.$store.dispatch('setCouponCode', hotelInformation.coupon_code)
      await this.$store.dispatch('setDiscountAmount', hotelInformation.discount_amount)
    }

    if(hotelInformation.card) {
      this.card = hotelInformation.card
    }

    this.current = hotelInformation
  }
}
</script>