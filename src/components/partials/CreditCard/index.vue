<template>
  <div class="flex flex-col">

    <div class="hidden md:flex w-full justify-center">
      <article class="item">
        <div class="card" :class="[focusedItem === 'cvv' ? 'flip' : '']">
          <figure class="card--front">
            <div class="card-lower">
              <div class="card-shinny" />
              <div
                class="card-number"
                :class="[focusedItem === 'number' ? 'focused' : '']"
              >
                <span v-if="card.card_number">{{ card.card_number }}</span>
                <span v-else>•••• •••• •••• ••••</span>
              </div>
              <div class="flex flex-row items-center">
                <div
                  class="card-name uppercase"
                  :class="[focusedItem === 'name' ? 'focused' : '']"
                >
                  <span v-if="card.card_name">{{ card.card_name }}</span>
                  <span v-else>AD SOYAD</span>
                </div>
                <div class="card-date" data-before="Valid Thru">
                  <span
                    class="card-month"
                    :class="[focusedItem === 'month' ? 'focused' : '']"
                  >
                    <template v-if="card.card_month">{{
                      card.card_month
                    }}</template>
                    <template v-else>••</template>
                  </span>
                  <span
                    class="card-year"
                    :class="[focusedItem === 'year' ? 'focused' : '']"
                  >
                    <template v-if="card.card_year">{{
                      card.card_year
                    }}</template>
                    <template v-else>••</template>
                  </span>
                </div>
              </div>
            </div>
          </figure>
          <figure class="card--back">
            <span class="credit-card-back-dark" />
            <span class="credit-card-back-white" />
            <div class="card-shinny" />
            <div
              class="card-cvv"
              :class="[focusedItem === 'cvv' ? 'focused' : '']"
            >
              {{ card.card_cvv }}
            </div>
          </figure>
        </div>
      </article>
    </div>

    <div class="w-full md:mt-10">


      <div class="w-full">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="card-name">
          Kartın Üzerindeki İsim
        </label>
        <input
            class="appearance-none block w-full text-gray-700 border hover:border-blue-400 rounded py-2 text-sm px-3 leading-tight focus:outline-none"
            id="card-name"
            type="text"
            placeholder="Kart üzerindeki ismi giriniz..."
            v-model="card.card_name"
            @focus="val => setFocused(val, 'name')"
        />
        <p v-if="errors.card_name" class="text-red-500 text-sm italic mt-3">Lütfen kart üzerindeki ismi giriniz.</p>
      </div>


      <div class="w-full mt-3">
        <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="card-number">
          Kart Numarası
        </label>
        <input
            class="appearance-none block w-full text-gray-700 border hover:border-blue-400 rounded py-2 text-sm px-3 leading-tight focus:outline-none"
            id="card-number"
            type="text"
            placeholder="Kart numarasını giriniz..."
            v-model="card.card_number"
            @focus="val => setFocused(val, 'number')"
        />
        <p v-if="errors.card_number" class="text-red-500 text-sm italic mt-3">Lütfen kart numarasını giriniz.</p>
      </div>

      <div class="flex flex-col mb-4 mt-3">

        <div class="flex flex-col md:flex-row">

          <div class="w-full md:w-2/3 md:mr-3 mb-3 md:mb-0">
            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="card-number">
              Kart Son Kullanma Tarihi
            </label>


            <div class=" flex flex-col md:flex-row">
              <div class="w-full mr-3">
                <div class="inline-block relative w-full mb-3 md:mb-0">
                  <select
                      class="block appearance-none w-full bg-white text-gray-700 border hover:border-blue-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                      @focus="val => setFocused(val, 'month')"
                      v-model="card.card_month"
                      id="card-month"
                  >
                    <option value="">Ay</option>
                    <option
                        v-for="(item, index) in card_months"
                        :key="index"
                        :value="item"
                    >{{item}}</option>

                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <p v-if="errors.card_month" class="text-red-500 text-sm italic mt-3">Lütfen ay seçiniz.</p>
              </div>

              <div class="w-full">
                <div class="inline-block relative w-full">
                  <select
                      class="block appearance-none w-full bg-white text-gray-700 border hover:border-blue-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                      @focus="val => setFocused(val, 'year')"
                      v-model="card.card_year"
                      id="card-year"
                  >
                    <option value="">Yıl</option>
                    <option
                        v-for="(item, index) in card_years"
                        :key="index"
                        :value="item"
                    >{{item}}</option>

                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <p v-if="errors.card_year" class="text-red-500 text-sm italic mt-3">Lütfen yıl seçiniz.</p>
              </div>
            </div>


          </div>


          <div class="w-full md:w-1/3">
            <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2" for="card-name">
              CVV
            </label>
            <input
                class="appearance-none block w-full text-gray-700 border hover:border-blue-400 rounded py-2 text-sm px-3 leading-tight focus:outline-none"
                id="card-cvv"
                type="number"
                placeholder="CVV giriniz..."
                v-model="card.card_cvv"
                @focus="val => setFocused(val, 'cvv')"
            />
            <p v-if="errors.card_cvv" class="text-red-500 text-sm italic mt-3">Lütfen CVVgiriniz.</p>
          </div>

        </div>
      </div>





    </div>

  </div>
</template>

<script>


import { helper } from "@/mixins/helper.js"

export default {
  name: "CreditCard",

  components: {

  },

  mixins: [helper],

  props: {
    card: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      focusedItem: "",
      focused: "",
      errors: {},
      card_months: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12"
      ],
      card_years: [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
        "2032"
      ]
    }
  },

  methods: {
    setFocused(val, name) {
      if (val) {
        this.focusedItem = name
      } else {
        this.focusedItem = ""
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.focused {
  opacity: 1 !important;
}

.card-shinny {
  width: 50px;
  height: 35px;
  border-radius: 5px;
  background: #ccc;
  position: relative;
  margin-bottom: 10px;

  &:before {
    content: " ";
    display: block;
    width: 70%;
    height: 60%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #d9d9d9;
    position: absolute;
    top: 20%;
  }
}

.item {
  border: 1px solid transparent;
  display: flex;
  height: 200px;
  perspective: 800px;
  position: relative;
  width: 350px;
  font-family: "Bitstream Vera Sans Mono", Consolas, Courier, monospace;
}

.card {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: all 0.6s linear;
  transform-style: preserve-3d;

  figure {
    margin: 0;
    background: #dddddd;
    border-radius: 8px;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  i {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: 0.5em;
    bottom: 0.5em;
  }

  &.flip {
    transform: rotateY(180deg);
  }
}

.card--front {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid #fff;
  position: relative;
  transition-delay: 0.3s;
  font-size: 20px;
  padding: 30px;

  .card-lower {
    width: 80%;
    position: absolute;
    left: 10%;
    bottom: 30px;
  }

  .card-name {
    opacity: 0.5;
    width: 65%;
    position: absolute;
    bottom: 0;
    line-height: 1;
    padding-right: 30px;
  }

  .card-date {
    width: 35%;
    font-size: 16px;
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;

    &:before {
      content: attr(data-before);
      width: 50px;
      font-size: 11px;
      font-family: Arial, sans-serif;
      line-height: 1;
      margin-right: 4px;
      opacity: 0.5;
    }

    .card-month {
      opacity: 0.5;

      &:after {
        content: "/";
        margin-left: 4px;
        margin-right: 4px;
      }
    }

    .card-year {
      opacity: 0.5;
    }
  }

  .card-number {
    margin-bottom: 60px;
    opacity: 0.5;
  }
}

.card--back {
  background: #d9faef;
  background: rgba(255, 255, 255, 0.25);
  position: relative;
  transform: rotateY(180deg);

  .credit-card-back-dark {
    width: 100%;
    margin-top: 20px;
    background: #212121;
    height: 40px;
    position: absolute;
  }

  .credit-card-back-white {
    width: 70%;
    margin-top: 72px;
    margin-left: 8px;
    background: #ffffff;
    height: 32px;
    position: absolute;
  }

  .card-cvv {
    position: absolute;
    left: 264px;
    margin-top: 32px;
    opacity: 0.5;
  }

  .card-shinny {
    top: 120px;
    left: 8px;

    &:after {
      position: absolute;
      content: "Yetkili imza, imzalanmadığı takdirde geçersizdir.";
      font-size: 9px;
      opacity: 0.4;
      width: 220px;
      padding: 4px 0 0 58px;
      font-family: Arial, sans-serif;
    }
  }
}

.card.flip .card--front {
  visibility: hidden;
}
</style>
