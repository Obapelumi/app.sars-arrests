<template>
  <div
    class="flex fixed items-center justify-center overflow-auto z-50 inset-0 w-full bg-black bg-opacity-75 pt-5"
    :class="
      show ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-0'
    "
  >
    <div
      class="max-h-full"
      :class="
        show
          ? 'transition ease-out duration-100 transform opacity-100 scale-100 z-50'
          : 'transition ease-in duration-75 transform opacity-0 scale-0'
      "
      role="dialog"
      aria-modal="true"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  watch: {
    show: {
      immediate: true,
      handler(value) {
        var body = document.querySelector("body");
        if (value) return body.classList.add("overflow-hidden");

        body.classList.remove("overflow-hidden");
      }
    }
  }
};
</script>
