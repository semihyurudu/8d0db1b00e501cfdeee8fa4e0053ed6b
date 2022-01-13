<template>
  <main>
    <div class="container mx-auto">
      <Steps />
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex"

import Steps from "@/components/partials/Steps/Steps";

export default {
  name: "home",
  components: {Steps},
  computed: {
    ...mapGetters({

    })
  },

  methods: {

  }
}
</script>