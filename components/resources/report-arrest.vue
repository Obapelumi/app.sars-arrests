<template>
  <form id="report-form" class="p-4">
    <div class="form-group mb-4">
      <label for="details">Name <span class="ml-0 text-red-500">*</span></label>
      <input type="text" id="details" v-model="arrest.details" required />
      <small class="form-error">{{ errors.details }}</small>
    </div>
    <div class="form-group mb-4">
      <label for="location">Location <span class="text-red-500">*</span></label>
      <input
        type="text"
        id="location"
        v-model="arrest.location"
        @focus="geolocate"
        required
      />
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
    autocomplete: null,
    disabled: false,
    errors: {},
    place: null
  }),
  methods: {
    geolocate() {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    },
    initGoogleMaps() {
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("location"),
        {
          types: ["geocode"],
          componentRestrictions: { country: "NG" }
        }
      );
      this.autocomplete.setFields([
        "address_component",
        "formatted_address",
        "geometry",
        "place_id"
      ]);

      this.autocomplete.addListener(
        "place_changed",
        () => (this.place = this.autocomplete.getPlace())
      );
    },
    async submit() {
      if (!this.validateForm("report-form")) return;

      this.disabled = true;

      try {
        if (!this.$auth.user) {
          localStorage.setItem("lastReport", JSON.stringify(this.arrest));
          return await this.twitterAuth();
        }
        const response = await this.$axios.post("arrests", {
          ...this.arrest,
          googlePlaceId: this.place.place_id
        });
        this.arrest = { details: null, location: null };
        this.place = null;
        this.$store.dispatch("snackbar", "report submitted");
        this.$emit("reported");
      } catch (error) {
        console.log(error);
        this.$store.dispatch("snackbar", "could not submit report");
        this.disabled = false;
      }

      this.disabled = false;
    }
  },
  mounted() {
    this.initGoogleMaps();
  },
  mixins: [form, twitter]
};
</script>
