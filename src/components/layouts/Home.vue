<template>
  <main>
    <div class="container mx-auto">
      <Steps />

      <div class="p-5 border border-gray-200 rounded-md my-5">
        <div class="inline-block relative w-full">
          <select
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              @change="setHotel"
          >
            <option>Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
            <option
                v-for="(item, index) in hotel_list"
                :key="index"
                :value="item.id"
                :selected="parseInt(item.id) === parseInt(selected_hotel.id)"
            >{{item.hotel_name}}</option>

          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>


        <div class="mt-5 flex flex-col lg:flex-row flex-wrap border border-gray-400 rounded">
          <div class="border-b lg:border-b-0 border-r-0 lg:border-r border-gray-400 p-5 form-item">

            <div class="w-full px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="start-date">
                Giriş Tarihi
              </label>
              <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="start-date"
                  type="text"
                  placeholder="Giriş tarihi seçiniz."
                  :class="[errors.start_date && 'border-red-500']"
              />
              <p v-if="errors.start_date" class="text-red-500 text-xs italic">Lütfen giriş tarihi seçiniz.</p>
            </div>
          </div>

          <div class="border-b lg:border-b-0 border-r-0 lg:border-r border-gray-400 p-5 form-item">
            <div class="w-full px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="end-date">
                Çıkış Tarihi
              </label>
              <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="end-date"
                  type="text"
                  placeholder="Çıkış tarihi seçiniz."
                  :class="[errors.end_date && 'border-red-500']"
              />
              <p v-if="errors.end_date" class="text-red-500 text-xs italic">Lütfen çıkış tarihi seçiniz.</p>
            </div>
          </div>

          <div class="border-b lg:border-b-0 border-r-0 lg:border-r border-gray-400 p-5 form-item">
            <div class="w-full px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="number-of-adults">
                Yetişkin Sayısı
              </label>
              <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="number-of-adults"
                  type="number"
                  placeholder="Yetişkin sayısı giriniz."
                  :class="[errors.number_of_adults && 'border-red-500']"
              />
              <p v-if="errors.number_of_adults" class="text-red-500 text-xs italic">Lütfen yetişkin sayısı giriniz.</p>
            </div>
          </div>

          <div class="p-5 form-item">
            <div class="w-full px-3">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="number-of-children">
                Çocuk Sayısı
              </label>
              <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="number-of-children"
                  type="number"
                  placeholder="Çocuk sayısı giriniz."
                  :class="[errors.number_of_children && 'border-red-500']"
              />
              <p v-if="errors.number_of_children" class="text-red-500 text-xs italic">Lütfen çocuk sayısı giriniz.</p>
            </div>
          </div>
        </div>

      </div>


    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex"
import { axiosInstance } from "@/plugins/services";
import Steps from "@/components/partials/Steps/Steps";

export default {
  name: "home",
  components: {Steps},
  computed: {
    ...mapGetters({
      hotel_list: "hotel_list",
      selected_hotel: "selected_hotel"
    })
  },

  methods: {
    async setHotel(event) {
      console.log('set', event.target.value)

      const selectedId = event.target.value

      if(selectedId) {
        const result = await axiosInstance.get('/hotel-details');

        console.log('data 1', result.data, selectedId)

        await this.$store.dispatch('setSelectedHotel', result.data.filter(x => x.id === selectedId)[0])
      }
    }
  },

  data() {
    return {
      errors: {
        start_date: false
      }
    }
  },

  async mounted() {

    if(!this.hotel_list.length) {
      const result = await axiosInstance.get('/hotels');
      await this.$store.dispatch('setHotelList', result.data)
    }

  }
}
</script>

<style scoped>
.form-item {
  flex: 25%;
}
</style>