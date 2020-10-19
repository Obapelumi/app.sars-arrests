<template>
  <loader />
</template>

<script>
import twitter from "@/mixins/twitter";
export default {
  async created() {
    const { oauth_token, oauth_verifier } = this.$route.query;
    const { token, tweep, user } = await this.getAccessToken(
      oauth_token,
      oauth_verifier
    );

    this.setAuth({ token: token.token, user: { ...user, tweep } });
    const arrest = JSON.parse(localStorage.getItem("lastReport"));
    console.log(arrest);
    const response = await this.$axios.post("arrests", arrest);
    localStorage.removeItem("lastArrest");
    this.$store.dispatch("snackbar", "report submitted");
    this.$router.replace("/");
  },
  mixins: [twitter]
};
</script>
