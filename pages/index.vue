<template>
  <div>
    <div
      class="fixed inset-0 z-10 bg-white shadow-sm h-16 p-3 lg:px-16 w-screen flex justify-between items-center"
    >
      <img src="/icon.png" alt="logo" class="h-10 w-auto rounded-full" />
      <button to="/report" class="btn btn-dark" @click="showReportModal = true">
        Report
      </button>
      <modal :show="showReportModal">
        <div class="bg-white rounded">
          <div class="modal-header">
            <button
              type="button"
              class="focus:outline-none"
              @click="showReportModal = false"
            >
              <x class="text-gray-700" />
            </button>
          </div>
          <div class="w-96">
            <report-arrest
              @reported="
                showReportModal = false;
                loadArrests();
              "
            />
          </div>
        </div>
      </modal>
    </div>
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
import Vue from "vue";
import reports from "@/resources/reports";

export default {
  data: () => ({
    arrests: [],
    arrestsLoading: true,
    showReportModal: false
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
