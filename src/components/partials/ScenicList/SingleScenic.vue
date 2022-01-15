<template>
  <div
      class="single-scenic-item rounded-md border-2 p-7 cursor-pointer relative mb-3 lg:mb-0"
      :class="[isActive ? 'border-green-600' : 'border-gray-200 hover:border-blue-400']"
      @click="setScenic"
  >
    <button
        class="text-white font-bold py-1 px-2 rounded text-sm absolute select-scenic-button"
        :class="[isActive ? 'bg-green-400 active-scenic-button' : 'bg-blue-400']"
    >
      {{isActive ? 'Seçildi' : 'Seç'}}
    </button>

    <h4 class="font-bold text-lg mb-2">{{data.title}}</h4>
    <img :src="data.photo" />

    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col md:flex-row mt-2 justify-between w-full">
        <div class="flex flex-col text-sm">
          Fiyat Etki Oranı
        </div>
        <div class="text-2xl font-normal leading-9">
          +{{data.price_rate}}%
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {helper} from "@/mixins/helper";

export default {
  name: "SingleScenic",

  mixins: [helper],

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      selected_room_scenic: "selected_room_scenic"
    }),

    isActive() {
      return parseInt(this.data.id) === parseInt(this.selected_room_scenic)
    }
  },

  methods: {
    setScenic() {
      this.$emit('setScenic', this.data.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.single-scenic-item {
  flex: calc(33.33% - 10px);
}
.select-scenic-button {
  top: 50%;
  margin-top: -14px;
  left: 50%;
  margin-left: -19px;
}

.select-scenic-button.active-scenic-button {
  margin-left: -27px !important;
}

@media (min-width: 1024px) {
  .single-scenic-item:not(:last-child) {
    margin-right: 15px;
  }
  .select-scenic-button {
    display: none;
  }
  .single-scenic-item:hover {
    .select-scenic-button {
      display: block;
    }
  }
}

</style>