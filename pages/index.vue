<template>
  <div>
    <div class="mt-20 mx-3 lg:px-12">
      <div
        class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        v-if="!arrestsLoading && arrests.length > 0"
      >
        <div v-for="arrest in arrests" :key="arrest.id">
          <arrest-item :arrest="arrest" />
        </div>
      </div>
      <h4 class="text-gray-700 font-bold" v-else-if="!arrestsLoading">
        No arrests to display
      </h4>
      <loader v-else />
    </div>
  </div>
</template>

<script>
import reports from "@/resources/reports";

export default {
  data: () => ({
    arrests: [],
    arrestsLoading: true
  }),
  mixins: [reports],
  methods: {
    async loadArrests() {
      this.arrests = await this.getArrests({});
      this.arrestsLoading = false;
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler() {
        this.loadArrests();
      }
    }
  }
};
</script>
