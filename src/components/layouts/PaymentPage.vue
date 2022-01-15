<template>
  <main>
    <div class="container mx-auto">
      <Steps />

      <form
          @submit="checkForm"
          method="post"
      >

      <div class="flex flex-col lg:flex-row">
        <div class="p-6 border border-gray-200 rounded-md my-5 w-full lg:w-1/2 lg:mr-5">
          <CreditCard :card="card" :errors="errors" @checkSingleValidation="checkSingleValidation" />
        </div>
        <div class="bg-gray-200 rounded-md p-6 rounded-md my-5 w-full lg:w-1/2">
          <PaymentPreview :current="current" v-if="current.hotel_id" page="payment" />
        </div>
      </div>

      <div class="bg-gray-200 p-6 rounded-md flex justify-between">

        <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm" @click="turnBack">
          <font-awesome-icon icon="angle-double-left" /> Geri
        </button>

        <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm">
          Ödeme yap ve Bitir <font-awesome-icon icon="angle-double-right" />
        </button>
      </div>

      </form>

    </div>
  </main>
</template>

<script>
import { axiosInstance } from "@/plugins/services";
import Steps from "@/components/partials/StepList";
import CreditCard from "@/components/partials/CreditCard"
import PaymentPreview from "@/components/partials/PaymentPreview"
import { mapGetters } from "vuex"

export default {
  name: "PaymentPage",

  computed: {
    ...mapGetters({
      coupon_code: "coupon_code",
      discount_amount: "discount_amount",
      selected_hotel: "selected_hotel",
      hotel_details: "hotel_details"
    })
  },

  components: {
    Steps,
    CreditCard,
    PaymentPreview
  },

  async mounted() {
    let hotelInformation = JSON.parse(localStorage.getItem('hotelInformation'))
    let step = localStorage.getItem('step')

    if(hotelInformation === null) {
      await this.$router.push({name: 'home'})
      return false
    }

    if(parseInt(step) === 2) {
      await this.$router.push({name: 'room'})
      return false
    }

    if(!this.selected_hotel || !this.hotel_details.length) {
      const result = await axiosInstance.get('/hotel-details');

      await this.$store.dispatch('setHotelDetails', result.data)
      await this.$store.dispatch('setSelectedHotel', result.data.filter(x => x.id === hotelInformation.hotel_id)[0])
    }

    await this.$store.dispatch('setSelectedRoomType', hotelInformation.room_type)
    await this.$store.dispatch('setSelectedRoomScenic', hotelInformation.room_scenic)

    if(hotelInformation.coupon_code && hotelInformation.discount_amount) {
      await this.$store.dispatch('setCouponCode', hotelInformation.coupon_code)
      await this.$store.dispatch('setDiscountAmount', hotelInformation.discount_amount)
    }

    if(hotelInformation.card) {
      this.card = hotelInformation.card
    }

    this.current = hotelInformation
  },

  data() {
    return {
      current: {},
      errors: {},
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

    checkForm: function (e) {

      let validForm = (this.card.card_number && this.card.card_name && this.card.card_month && this.card.card_year && this.card.card_cvv);

      this.errors = {
        ...this.errors,
        card_number: !this.card.card_number,
        card_name: !this.card.card_name,
        card_month: !this.card.card_month,
        card_year: !this.card.card_year,
        card_cvv: !this.card.card_cvv,
      }

      if(validForm) {
        this.saveForm()
      }

      e.preventDefault();

    },

    async saveForm() {

      let data = {
        hotel_id: parseInt(this.current.hotel_id),
        start_date: this.current.start_date,
        end_date: this.current.end_date,
        adult: parseInt(this.current.adult),
        child: parseInt(this.current.child),
        room_type: parseInt(this.current.room_type),
        room_scenic: parseInt(this.current.room_scenic),
        price: 0,
        coupon_code: this.current.coupon_code,
        card_name: this.card.card_name,
        card_number: this.card.card_number.replaceAll(' ', ''),
        card_date_month: this.card.card_month,
        card_date_year: this.card.card_year,
        card_cvv: this.card.card_cvv
      }

      const reservationId = localStorage.getItem('reservationId')
      let result;
      if(reservationId) {
        result = await axiosInstance.put('/hotel-bookings/' + reservationId, data);
      } else {
        result = await axiosInstance.post('/hotel-bookings', data);
      }

      if(result.data.id) {
        localStorage.setItem('reservationId', result.data.id)
        await this.goToSuccessPage()
      }

    },

    checkSingleValidation(data) {
      if(data.value) {
        this.errors = {...this.errors, [data.name]: false}
      }
    },

    goToSuccessPage() {
      let hotelInformation = {
        ...JSON.parse(localStorage.getItem('hotelInformation')),
        card: this.card,
        coupon_code: this.coupon_code,
        discount_amount: this.discount_amount
      }

      localStorage.setItem('hotelInformation', JSON.stringify(hotelInformation))

      this.$router.push({ name: 'success'})
      this.$store.dispatch('setStep', '4')
      localStorage.setItem('step', '4')
    }
  }
}
</script>