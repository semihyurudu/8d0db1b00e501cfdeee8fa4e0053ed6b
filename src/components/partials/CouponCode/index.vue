<template>
  <div>
    <div class="w-full items-center bg-white p-2 rounded-md flex flex-col md:flex-row items-start justify-start">
      <div class="w-full mr-2 mb-2 md:mb-0">
        <input
            class="appearance-none block w-full text-gray-700 border hover:border-blue-400 rounded py-2 text-sm px-3 leading-tight focus:outline-none"
            id="coupon-code"
            type="text"
            placeholder="Kupon kodunuzu giriniz..."
            v-model="code"
            @keyup="couponCodeKeyUp"
            v-if="!coupon_code"
        />
        <span class="text-sm leading-1" v-else>
          <b class="font-semibold">{{coupon_code}}</b> numaralı kupon kodunuzda yer alan <b class="font-semibold">{{priceFormat(discount_amount)}}</b> indirim rezervasyon tutarınıza uygulandı!
        </span>

      </div>

      <button
          class="bg-blue-900 hover:bg-blue-800 text-white font-bold p-2 rounded text-sm w-full"
          @click="setCouponCode"
          v-if="!coupon_code"
      >
        Kodu Kullan
      </button>
      <button
          class="bg-red-800 hover:bg-red-700 text-white font-bold p-2 rounded text-sm w-full"
          @click="removeCouponCode"
          v-else
      >
        Kodu Kaldır
      </button>
    </div>
    <p v-if="error" class="text-red-500 text-sm italic mt-3 text-center">{{error_message}}</p>
  </div>
</template>

<script>
import { axiosInstance } from "@/plugins/services";
import { mapGetters } from "vuex";
import { helper } from "@/mixins/helper.js"

export default {
  name: "CouponCode",

  computed: {
    ...mapGetters({
      coupon_code: "coupon_code",
      discount_amount: "discount_amount"
    })
  },

  mixins: [helper],

  data() {
    return {
      code: "",
      error: false,
      error_message: "Lütfen kupon kodunuzu giriniz."
    }
  },

  methods: {
    async setCouponCode() {

      if(!this.code) {
        this.error = true
        this.error_message = "Lütfen kupon kodunuzu giriniz."

        return false
      }

      const result = await axiosInstance.get('/coupons?code=' + this.code);

      if(!result.data.length) {

        this.error = true
        this.error_message = "Geçersiz kupon kodu!"
        return false

      } else if(result.data.length > 1) {

        this.error = true
        this.error_message = "Lütfen kupon kodunuzu tam ve doğru şekilde yazınız."
        return false

      }

      if(this.dateDiff(this.getCurrentDate(), result.data[0].expiration_at) < 1) {
        this.error = true
        this.error_message = "Kupon kodunuzun kullanım süresi dolmuştur."
      } else {

        await this.$store.dispatch('setCouponCode', result.data[0].code)
        await this.$store.dispatch('setDiscountAmount', result.data[0].discount_ammount)


      }

    },

    couponCodeKeyUp(e) {
      if(e.target.value) {
        this.error = false
        this.error_message = ""
      }
    },

    removeCouponCode() {
      this.$store.dispatch('setCouponCode', "")
      this.$store.dispatch('setDiscountAmount', 0)
    }
  }
}
</script>