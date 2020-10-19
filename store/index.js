export default {
  state: () => ({
    showSnackBar: false,
    snackBarMessage: null
  }),
  mutations: {
    setSnackBar(state, { message, show }) {
      state.showSnackBar = show;
      state.snackBarMessage = message;
    }
  },
  actions: {
    snackbar({ commit }, message) {
      commit("setSnackBar", { message, show: true }, { root: true });
      setTimeout(() => {
        commit("setSnackBar", { message: null, show: false });
      }, 3000);
    }
  }
};
