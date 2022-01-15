<template>
  <div class="bg-gray-200 rounded-md p-3">
    <div class="flex justify-center step-container">
      <Step icon="calendar-alt" title="Otel ve Tarih Seçimi" :step-number="1" />
      <Step icon="bed" title="Oda Tipi ve Manzara Seçimi" :step-number="2" />
      <Step icon="credit-card" title="Önizleme ve Ödeme İşlemleri" :step-number="3" />
    </div>
  </div>
</template>

<script>
import Step from "@/components/partials/StepList/SingleStep";
export default {
  name: "Steps",

  components: {
    Step
  }
}
</script>

<style scoped>
.step-container {
  z-index: 2;
}
</style>