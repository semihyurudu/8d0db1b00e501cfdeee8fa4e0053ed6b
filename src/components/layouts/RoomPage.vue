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

      <div>
        <h3 class="w-full border-b border-gray-200 text-lg font-semibold">Oda Tipi Seçimi</h3>
        <Rooms :current="current" @setRoom="(val) => setRoom(val)" />
        <p v-if="errors.room_type" class="text-red-500 text-sm italic mt-3 mb-5">Lütfen oda tipi seçiniz.</p>

        <div class="hidden"
             v-for="(item, index) in selected_hotel.room_type"
             :key="index"
        >
          <input type="radio" :value="item.id" v-model="roomTypeCheckbox" />
        </div>

      </div>

      <div>
        <h3 class="w-full border-b border-gray-200 text-lg font-semibold">Manzara Seçimi</h3>
        <Scenic @setScenic="(val) => setScenic(val)" />
        <p v-if="errors.room_scenic" class="text-red-500 text-sm italic mt-3 mb-5">Lütfen oda manzarası seçiniz.</p>

        <div class="hidden"
             v-for="(item, index) in selected_hotel.room_scenic"
             :key="index"
        >
          <input type="radio" :value="item.id" v-model="roomScenicCheckbox" />
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
import Steps from "@/components/partials/StepList";
import Rooms from "@/components/partials/RoomList";
import Scenic from "@/components/partials/ScenicList";
import {axiosInstance} from "@/plugins/services";
import { mapGetters } from "vuex"

export default {
  name: "Room",

  components: {
    Steps,
    Rooms,
    Scenic
  },

  computed: {
    ...mapGetters({
      selected_hotel: "selected_hotel",
      selected_room: "selected_room",
      selected_scenic: "selected_scenic",
      hotel_details: "hotel_details"
    })
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

    this.current = hotelInformation

    if(hotelInformation.room_type) {
      this.roomTypeCheckbox = hotelInformation.room_type
      await this.$store.dispatch('setSelectedRoom', this.roomTypeCheckbox)
    }

    if(hotelInformation.room_scenic) {
      this.roomScenicCheckbox = hotelInformation.room_scenic
      await this.$store.dispatch('setSelectedScenic', this.roomScenicCheckbox)
    }

  },

  methods: {
    turnBack() {
      this.$store.dispatch('setStep', '1')
      this.$router.push({name: 'home'})
    },

    checkForm() {
      let validForm = this.selected_room && this.selected_scenic

      this.errors = {...this.errors, room_type: !this.selected_room}

      this.errors = {...this.errors, room_scenic: !this.selected_scenic}

      if(validForm) {

        localStorage.setItem('step', '3')
        localStorage.setItem('hotelInformation', JSON.stringify({
          ...JSON.parse(localStorage.getItem('hotelInformation')),
          room_type: this.selected_room,
          room_scenic: this.selected_scenic,
          price: this.selected_hotel.room_type.filter((x) => x.id === this.selected_room)[0].price,
          price_rate: this.selected_hotel.room_scenic.filter((x) => x.id === this.selected_scenic)[0].price_rate
        }))

        this.$router.push({ name: 'payment' })

        this.$store.dispatch('setStep', '3')

      }

    },

    setRoom(id) {
      this.roomTypeCheckbox = id
      this.$store.dispatch('setSelectedRoom', this.roomTypeCheckbox)
      this.errors = {...this.errors, room_type: false}
    },

    setScenic(id) {
      this.roomScenicCheckbox = id
      this.$store.dispatch('setSelectedScenic', this.roomScenicCheckbox)
      this.errors = {...this.errors, room_scenic: false}
    }
  },

  data() {
    return {
      current: {},
      errors: {},
      roomTypeCheckbox: "",
      roomScenicCheckbox: ""
    }
  }
}
</script>