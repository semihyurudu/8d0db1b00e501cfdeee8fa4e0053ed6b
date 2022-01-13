<template>
  <header class="px-8 py-4 bg-blue-900 text-white">
    <div class="flex justify-between items-center">

      <Logo />

      <button class="bg-white text-blue-900 font-bold py-1 px-2 rounded text-sm">
        Yeni Rezervasyon Yap
      </button>

    </div>
  </header>
</template>

<script>
import Logo from "@/components/partials/Logo";

export default {
  name: "Header",
  components: {Logo}
}
</script>