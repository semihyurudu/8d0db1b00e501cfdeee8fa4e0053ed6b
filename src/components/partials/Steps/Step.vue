<template>
  <div class="flex flex-col items-center mx-4 w-40 text-center relative step-item">
    <div
        class="p-4 border rounded-full text-center w-16 h-16 leading-8 bg-white text-2xl"
        :class="[isActive ? 'border-gray-700 text-gray-900' : 'border-gray-300 text-gray-500']"
    ><font-awesome-icon :icon="icon" /></div>

    <div class="mt-3">
      <span class="font-semibold text-sm" :class="[isActive ? 'text-gray-900' : 'text-gray-500']">{{title}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Steps",

  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    stepNumber: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      step: "step"
    }),

    isActive() {
      return parseInt(this.step) === this.stepNumber
    }
  }
}
</script>

<style>
.step-item:not(:last-child)::after {
  position: absolute;
  content: "";
  border-bottom: 1px solid #d2d6db;
  width: 100%;
  top: 30px;
  left: 112px;
}
</style>