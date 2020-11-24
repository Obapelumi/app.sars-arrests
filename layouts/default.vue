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
    <snackbar />
    <Nuxt />
  </div>
</template>

<script>
export default {
  data: () => ({
    showReportModal: false
  })
};
</script>
