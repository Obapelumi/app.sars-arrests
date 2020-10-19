<template>
  <button
    :disabled="disabled"
    @click.prevent="$emit('click')"
    :class="disabled ? 'opacity-75 cursor-not-allowed' : ''"
  >
    <span v-if="!disabled"><slot /></span>
    <span v-else class="flex justify-center items-center">
      <div
        class="spinner-grow text-white mr-1 align-self-center loader-sm"
      ></div>
      {{ loading }}</span
    >
  </button>
</template>

<script>
export default {
  props: ["disabled", "loading"]
};
</script>

<style scoped>
@import "@/assets/css/loader.css";
</style>
