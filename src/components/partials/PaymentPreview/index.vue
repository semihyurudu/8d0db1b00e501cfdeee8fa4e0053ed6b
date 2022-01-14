<template>
  <div>
    <h2 class="text-xl font-bold mb-3 mx-1">{{current.hotel_name}} <span class="text-md font-light">({{selected_hotel.city}})</span></h2>

    <div class="flex flex-col md:flex-row flex-wrap mb-2">
      <PreviewInfo title="Giriş Tarihi" :value="current.start_date" />
      <PreviewInfo title="Çıkış Tarihi" :value="current.end_date" />
      <PreviewInfo title="Yetişkin" :value="current.adult" />
      <PreviewInfo title="Çocuk" :value="current.child" />
      <PreviewInfo title="Oda Tipi" :value="getRoomTypeName" />
      <PreviewInfo title="Manzara" :value="getRoomScenicName" />
    </div>

    <CouponCode class="md:mx-1" v-if="page === 'payment'" />

    <div class="bg-white rounded-md md:mx-1" :class="page === 'payment' ? 'mt-4' : 'mt-2'">

      <div class="flex flex-col text-sm leading-6 p-4">

        <div class="flex flex-row justify-between">
          <span class="font-semibold">Oda Fiyatı</span>
          <span>{{priceFormat(current.price)}}</span>
        </div>

        <div class="flex flex-row justify-between">
          <span class="font-semibold">Fiyat Etki Oranı</span>
          <span>%{{current.price_rate}}</span>
        </div>

        <div class="flex flex-row justify-between">
          <span class="font-semibold">Konaklama <span class="font-normal">({{getDateDiff}} Gün)</span></span>
          <span>{{priceFormat(current.price * current.adult * getDateDiff)}}</span>
        </div>

        <div class="flex flex-row justify-between" v-if="coupon_code && discount_amount">
          <span class="font-semibold">İndirim <span class="font-normal">({{coupon_code}})</span></span>
          <span>- {{priceFormat(discount_amount)}}</span>
        </div>
      </div>

      <div class="w-full preview-divider border-t border-gray-400 mb-3"></div>

      <div class="flex flex-col items-center">
        <span class="font-semibold text-sm">TOPLAM TUTAR</span>
        <span class="font-bold text-2xl mt-1 mb-4">{{priceFormat(getTotalPrice)}}</span>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import PreviewInfo from "@/components/partials/PaymentPreview/PreviewInfo"
import CouponCode from "@/components/partials/CouponCode"
import { helper } from "@/mixins/helper.js"

export default {
  name: "PaymentPreview",

  components: {
    PreviewInfo,
    CouponCode
  },

  mixins: [helper],

  props: {
    current: {
      type: Object,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      selected_hotel: "selected_hotel",
      selected_room: "selected_room",
      selected_scenic: "selected_scenic",
      coupon_code: "coupon_code",
      discount_amount: "discount_amount"
    }),

    getRoomTypeName() {
      return this.selected_hotel.room_type.filter((x) => x.id === this.selected_room)[0].title
    },

    getRoomScenicName() {
      return this.selected_hotel.room_scenic.filter((x) => x.id === this.selected_scenic)[0].title
    },

    getPrice() {
      return this.current.price * this.current.adult * this.dateDiff(this.current.start_date, this.current.end_date)
    },

    getTotalPrice() {

      let price = this.getTotalWithPercentage(this.current.price_rate, this.getPrice)

      if(this.coupon_code && this.discount_amount) {
        price = (price - this.discount_amount)
      }

      return price
    },

    getDateDiff() {
      return this.dateDiff(this.current.start_date, this.current.end_date)
    }
  },

  methods: {

  }
}
</script>