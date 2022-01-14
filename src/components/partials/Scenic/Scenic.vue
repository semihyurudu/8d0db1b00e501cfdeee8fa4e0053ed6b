<template>
  <div class="flex flex-col lg:flex-row flex-wrap my-5">
    <SingleScenic
        v-for="(item, index) in selected_hotel.room_scenic"
        :key="index"
        :data="item"
        @setScenic="(val) => setScenic(val)"
    />
  </div>

</template>

<script>

import { mapGetters } from "vuex";
import SingleScenic from "@/components/partials/Scenic/SingleScenic";

export default {
  name: "Scenic",

  components: {
    SingleScenic
  },

  computed: {
    ...mapGetters({
      selected_hotel: "selected_hotel"
    })
  },

  methods: {

    setScenic(id) {
      this.$emit('setScenic', id)
    }
  }
}
</script>