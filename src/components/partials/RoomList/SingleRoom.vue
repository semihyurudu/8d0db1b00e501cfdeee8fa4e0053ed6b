<template>
  <div
      class="single-room-item rounded-md border-2 p-7 cursor-pointer relative mb-3 lg:mb-0"
      :class="[isActive ? 'border-green-600' : 'border-gray-200 hover:border-blue-400']"
      @click="setRoom"
  >
    <button
        class="text-white font-bold py-1 px-2 rounded text-sm absolute select-room-button"
        :class="[isActive ? 'bg-green-400 active-room-button' : 'bg-blue-400']"
    >
      {{isActive ? 'Seçildi' : 'Seç'}}
    </button>

    <h4 class="font-bold text-lg mb-2">{{data.title}}</h4>
    <img :src="data.photo" />

    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col md:flex-row mt-2 justify-between w-full">
        <div class="flex flex-col text-sm">
          <span v-if="current.start_date && current.end_date">{{dateDiff(current.start_date, current.end_date)}} Gün</span>
          <span>{{current.adult}} Yetişkin<span v-if="parseInt(current.child)"> - {{current.child}} Çocuk</span></span>
        </div>
        <div class="text-2xl font-normal leading-9">
          {{priceFormat(data.price * current.adult * dateDiff(current.start_date, current.end_date))}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import {helper} from "@/mixins/helper";

export default {
  name: "SingleRoom",

  mixins: [helper],

  props: {
    data: {
      type: Object,
      required: true
    },
    current: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
        selected_room_type: "selected_room_type"
    }),

    isActive() {
      return parseInt(this.data.id) === parseInt(this.selected_room_type)
    }
  },

  methods: {
    setRoom() {
      this.$emit('setRoom', this.data.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.single-room-item {
  flex: calc(33.33% - 10px);
}
.select-room-button {
  top: 50%;
  margin-top: -14px;
  left: 50%;
  margin-left: -19px;
}

.select-room-button.active-room-button {
  margin-left: -27px !important;
}

@media (min-width: 1024px) {
  .single-room-item:not(:last-child) {
    margin-right: 15px;
  }
  .select-room-button {
    display: none;
  }
  .single-room-item:hover {
    .select-room-button {
      display: block;
    }
  }

}


</style>