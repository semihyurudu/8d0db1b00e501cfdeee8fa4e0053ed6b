<template>
  <main>
    <div class="container mx-auto">
      <Steps />

      <form
          @submit="checkForm"
          method="post"
      >

        <div class="p-6 border border-gray-200 rounded-md my-5">
          <div class="inline-block relative w-full">
            <select
                class="block appearance-none w-full bg-white border border-gray-300 hover:border-blue-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                @change="setHotel"
                v-model="hotel_id"
                id="hotel_id"
            >
              <option value="">Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
              <option
                  v-for="(item, index) in hotel_list"
                  :key="index"
                  :value="item.id"
              >{{item.hotel_name}}</option>

            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <p v-if="errors.hotel_id" class="text-red-500 text-sm italic mt-3">Lütfen otel seçiniz.</p>



          <div class="mt-5 flex flex-col lg:flex-row flex-wrap border border-gray-400 rounded">
            <div class="border-b lg:border-b-0 border-r-0 lg:border-r border-gray-400 p-5 form-item">
              <div class="px-3">
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Giriş Tarihi
                </label>
                <date-picker v-model="start_date" :change="checkSingleValidation('start_date')" class="w-full" valueType="format" placeholder="Giriş tarihi seçiniz."></date-picker>
                <p v-if="errors.start_date" class="text-red-500 text-sm italic mt-3">Lütfen giriş tarihi seçiniz.</p>
              </div>
            </div>

            <div class="border-b lg:border-b-0 border-r-0 lg:border-r border-gray-400 p-5 form-item">
              <div class="px-3">
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Çıkış Tarihi
                </label>
                <date-picker v-model="end_date" :change="checkSingleValidation('end_date')" class="w-full" valueType="format" placeholder="Çıkış tarihi seçiniz."></date-picker>
                <p v-if="errors.end_date" class="text-red-500 text-sm italic mt-3">Lütfen çıkış tarihi seçiniz.</p>
                <p v-if="date_error" class="text-red-500 text-sm italic mt-3">Çıkış tarihi giriş tarihinden büyük olmalıdır.</p>
              </div>
            </div>

            <div class="border-b lg:border-b-0 border-r-0 lg:border-r border-gray-400 p-5 form-item">
              <div class="w-full px-3">
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="number-of-adults">
                  Yetişkin Sayısı
                </label>
                <input
                    class="appearance-none block w-full text-gray-700 border hover:border-blue-400 rounded py-2 text-sm px-3 leading-tight focus:outline-none"
                    id="number-of-adults"
                    type="number"
                    v-mask="'##'"
                    placeholder="Yetişkin sayısı giriniz."
                    v-model="adult"
                    @keyup="checkSingleValidation('adult')"
                />
                <p v-if="errors.adult" class="text-red-500 text-sm italic mt-3">Lütfen yetişkin sayısı giriniz.</p>
                <p v-if="max_adult_size_error" class="text-red-500 text-sm italic mt-3">Maksimum {{selected_hotel.max_adult_size}} yetişkin kabul edilmektedir.</p>
              </div>
            </div>

            <div class="p-5 form-item">
              <div
                  class="w-full px-3"
              >
                <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="number-of-children">
                  Çocuk Sayısı
                </label>
                <input
                    class="appearance-none block w-full text-gray-700 border hover:border-blue-400 rounded py-2 text-sm px-3 leading-tight focus:outline-none"
                    id="number-of-children"
                    type="number"
                    v-mask="'#'"
                    placeholder="Çocuk sayısı giriniz."
                    :class="[(selected_hotel.id && !selected_hotel.child_status) && 'pointer-events-none']"
                    @keyup="checkSingleValidation('child')"
                    v-model="child"
                />
                <p v-if="(selected_hotel.id && !selected_hotel.child_status)" class="text-red-500 text-sm italic mt-3">Çocuk ziyaretçi kabul edilmiyor!</p>
                <p v-if="max_child_size_error" class="text-red-500 text-sm italic mt-3">Maksimum {{max_child_size}} çocuk kabul edilmektedir.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-200 p-6 rounded-md flex justify-end">

          <button type="submit" class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded text-sm">
            Kaydet ve Devam Et <font-awesome-icon icon="angle-double-right" />
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex"
import { axiosInstance } from "@/plugins/services";
import Steps from "@/components/partials/Steps/Steps";
import { helper } from "@/mixins/helper.js"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {
  name: "home",

  mixins: [helper],

  components: {
    Steps, DatePicker
  },

  computed: {
    ...mapGetters({
      hotel_list: "hotel_list",
      selected_hotel: "selected_hotel",
      hotel_details: "hotel_details"
    })
  },


  methods: {
    async setHotel(event) {

      const selectedId = event.target.value

      this.errors = {...this.errors, hotel_id: !selectedId}

      if(!selectedId) {
        await this.$store.dispatch('setSelectedHotel', {})

        return false
      }

      if(this.hotel_details.length) {
        await this.$store.dispatch('setSelectedHotel', this.hotel_details.filter(x => x.id === selectedId)[0])

        this.setChild()
        this.setAdult()

        return false
      }

      const result = await axiosInstance.get('/hotel-details');

      await this.$store.dispatch('setHotelDetails', result.data)
      await this.$store.dispatch('setSelectedHotel', result.data.filter(x => x.id === selectedId)[0])

      this.setChild()
      this.setAdult()

    },
    setChild() {
      if(parseInt(this.child) === 0 && this.selected_hotel.child_status) {
        this.child = ""
      } else if(!this.selected_hotel.child_status) {
        this.child = 0
        this.max_child_size_error = false
      }
    },

    setAdult() {
      if(this.adult && (this.adult > this.selected_hotel.max_adult_size)) {
        this.adult = this.selected_hotel.max_adult_size
      }
    },

    checkForm: function (e) {

      let validForm = (this.hotel_id && this.start_date && this.end_date && this.adult);

      this.errors = {
        ...this.errors,
        hotel_id: !this.hotel_id,
        start_date: !this.start_date,
        end_date: !this.end_date,
        adult: !this.adult,
      }

      if(this.dateDiff(this.start_date, this.end_date) < 1) {

        this.date_error = true

        validForm = false
      }

      if(this.adult && (parseInt(this.adult) > this.selected_hotel.max_adult_size)) {

        this.max_adult_size_error = true

        validForm = false
      }

      if(this.child && (parseInt(this.child) > this.max_child_size)) {

        this.max_child_size_error = true

        validForm = false
      } else if(!this.child || (this.max_child_size >= this.child)) {
        this.max_child_size_error = false
      }

      if(validForm) {
        this.saveForm()
      }

      e.preventDefault();
    },

    checkSingleValidation(type) {
      if(this.errors[type] && this[type]) {
        this.errors = {...this.errors, [type]: false}
      }

      if(type.includes("date")) {
        this.date_error = this.dateDiff(this.start_date, this.end_date) < 1
      }

      if(type === 'adult' && this.selected_hotel) {
        this.max_adult_size_error = parseInt(this.adult) > this.selected_hotel.max_adult_size
      }

      if(type === 'child' && this.selected_hotel) {
        this.max_child_size_error = parseInt(this.child) > this.max_child_size
      }

    },

    saveForm() {
      let sel = document.getElementById("hotel_id")

      localStorage.setItem('step', '2')
      localStorage.setItem('hotelInformation', JSON.stringify({
        ...JSON.parse(localStorage.getItem('hotelInformation')),
        hotel_id: this.hotel_id,
        hotel_name: sel.options[sel.selectedIndex].text,
        start_date: this.start_date,
        end_date: this.end_date,
        adult: this.adult,
        child: this.child || "0"
      }))

      this.$router.push({ name: 'room' })

      this.$store.dispatch('setStep', '2')

    }
  },

  data() {
    return {
      errors: {},
      hotel_id: "",
      start_date: null,
      end_date: null,
      adult: "",
      child: "",
      date_error: false,
      max_adult_size_error: false,
      max_child_size_error: false,
      max_child_size: 5
    }
  },

  async mounted() {


    if(!this.hotel_list.length) {
      const result = await axiosInstance.get('/hotels');
      await this.$store.dispatch('setHotelList', result.data)
    }

    let hotelInformation = JSON.parse(localStorage.getItem('hotelInformation'))

    if(hotelInformation !== null) {
      this.hotel_id = hotelInformation.hotel_id
      this.start_date = hotelInformation.start_date
      this.end_date = hotelInformation.end_date
      this.adult = hotelInformation.adult
      this.child = hotelInformation.child
    }

  }
}
</script>

<style scoped>
.form-item {
  flex: 25%;
}
.mx-datepicker {
  width: 100% !important;
}
.form-item .pointer-events-none {
  opacity: 0.6;
}
</style>