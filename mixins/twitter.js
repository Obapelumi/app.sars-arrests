export default {
  methods: {
    async getAccessToken(token, verifier, dataOnly = true) {
      try {
        const response = await this.$axios.post("oauth/twitter/access-token", {
          token,
          verifier
        });
        return dataOnly ? response.data : data;
      } catch (error) {
        console.log(error);
      }
    },
    async requestToken(dataOnly = true) {
      try {
        const response = await this.$axios.get("oauth/twitter/request-token");
        return dataOnly ? response.data : data;
      } catch (error) {
        console.log(error);
      }
    },
    async twitterAuth() {
      try {
        const { token } = await this.requestToken();
        window.location.href = this.twitterAuthUrl(token);
      } catch (error) {
        console.log(error);
      }
    },
    twitterAuthUrl(token) {
      return `https://api.twitter.com/oauth/authenticate?oauth_token=${token}`;
    }
  }
};
