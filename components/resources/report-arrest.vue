<template>
  <form id="report-form" class="p-4">
    <div class="form-group mb-4">
      <label for="details">Name <span class="ml-0 text-red-500">*</span></label>
      <input type="text" id="details" v-model="arrest.details" required />
      <small class="form-error">{{ errors.details }}</small>
    </div>
    <div class="form-group mb-4">
      <label for="location">Location <span class="text-red-500">*</span></label>
      <input type="text" id="location" v-model="arrest.location" required />
      <small class="form-error">{{ errors.location }}</small>
    </div>

    <v-button
      type="submit"
      class="btn btn-dark w-full"
      :disabled="disabled"
      @click="submit()"
      loading="Submitting..."
      >Submit</v-button
    >
  </form>
</template>

<script>
import form from "@/mixins/forms";
import twitter from "@/mixins/twitter";

export default {
  data: () => ({
    arrest: { details: null, location: null },
    disabled: false,
    errors: {}
  }),
  methods: {
    async submit() {
      if (!this.validateForm("report-form")) return;

      this.disabled = true;

      if (!this.$auth.user) {
        localStorage.setItem("lastReport", JSON.stringify(this.arrest));
        return this.twitterAuth();
      }

      try {
        const response = await this.$axios.post("arrests", this.arrest);
        this.arrest = { details: null, location: null };
        this.$store.dispatch("snackbar", "report submitted");
        this.$emit("reported");
      } catch (error) {
        console.log(error);
        this.$store.dispatch("snackbar", "could not submit report");
      }

      this.disabled = false;
    }
  },
  mixins: [form, twitter]
};
</script>
