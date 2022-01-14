<template>
  <div class="w-full md:w-1/2 mx-1 flex flex-row justify-center text-sm items-center bg-white p-2 rounded-md mb-2 preview-info-item">
    <span class="font-bold mr-2">{{title}}:</span>
    <span>{{value}}</span>
  </div>
</template>

<script>
export default {
  name: "PreviewInfo",

  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.preview-info-item {
  flex: calc(50% - 1rem)
}
</style>