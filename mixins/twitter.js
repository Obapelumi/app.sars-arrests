export default {
  methods: {
    async getAccessToken(token, verifier, dataOnly = true) {
      const response = await this.$axios.post("oauth/twitter/access-token", {
        token,
        verifier
      });
      return dataOnly ? response.data : data;
    },
    async requestToken(dataOnly = true) {
      const response = await this.$axios.get("oauth/twitter/request-token");
      return dataOnly ? response.data : data;
    },
    async twitterAuth() {
      const { token } = await this.requestToken();
      window.location.href = this.twitterAuthUrl(token);
    },
    twitterAuthUrl(token) {
      return `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`;
    }
  }
};
