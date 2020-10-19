export default {
  methods: {
    async getArrests(
      { page = 1, perPage = 100, relationships = [], statuses = [] },
      dataOnly = true
    ) {
      const response = await this.$axios.get("arrests", {
        params: { page, perPage, relationships, statuses }
      });

      return dataOnly ? response.data.data : response;
    }
  }
};
