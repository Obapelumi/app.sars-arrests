export default ({ $axios }) => {
  const token = localStorage.getItem("token");

  $axios.setToken(token, "Bearer");

  return true;
};
