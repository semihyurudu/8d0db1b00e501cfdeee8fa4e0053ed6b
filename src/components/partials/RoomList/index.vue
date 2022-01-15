<template>
  <div class="flex flex-col lg:flex-row flex-wrap my-5">
    <SingleRoom
        v-for="(item, index) in selected_hotel.room_type"
        :key="index"
        :data="item"
        :current="current"
        @setRoom="(val) => setRoom(val)"
    />
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import SingleRoom from "@/components/partials/RoomList/SingleRoom";

export default {
  name: "Rooms",

  components: {
    SingleRoom
  },

  props: {
    current: {
      type: Object,
      required: false
    }
  },

  computed: {
    ...mapGetters({
      selected_hotel: "selected_hotel"
    })
  },

  methods: {
    setRoom(id) {
      this.$emit('setRoom', id)
    }
  }
}
</script>