import Vue from "vue";

Vue.mixin({
  computed: {
    $auth() {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      return { user, token };
    },
    mainRole() {
      const roleCodes = !this.$auth.user
        ? []
        : this.getRoleCodes(this.$auth.user);
      if (roleCodes.includes("administrator")) return "administrator";
      if (roleCodes.includes("doctor")) return "doctor";
      return "patient";
    },
    now() {
      return new Date();
    }
  },
  filters: {
    age(value) {
      return Math.floor(value);
    },
    decimalPlaces(value, dp = 2) {
      return parseFloat(value).toFixed(dp);
    },
    ellipse(text, length = 50) {
      if (!text) return "";
      const ellipseText = text.length > length ? "..." : "";
      return text.substring(0, length + 1) + ellipseText;
    },
    dateFormat(
      date,
      options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }
    ) {
      if (!date) return "-";
      return new Intl.DateTimeFormat("en-NG", options).format(new Date(date));
    },
    roundDown(value) {
      return Math.floor(value);
    },
    toMoney(value, currency = "NGN") {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
        currencyDisplay: "symbol"
      }).format(value);
    }
  },
  methods: {
    authorized(action) {
      const user = this.$auth.user;
      if (!user) return false;
      const permissions = user.roles.reduce(
        (all, role) => all.concat(role.permissions),
        []
      );

      const permission = permissions.find((search) => search.code == action);

      if (!permission) return false;

      return true;
    },
    getRoleCodes(user) {
      return typeof user.roles == "undefined"
        ? []
        : user.roles.map((role) => role.code);
    },
    importScript(scriptPath, appendTo = "body") {
      let scriptTag = document.createElement("script");
      scriptTag.setAttribute("src", scriptPath);
      document[appendTo].appendChild(scriptTag);
    },
    linkCheck(action, to = null) {
      const authorized = this.authorized(action);
      if (!authorized) return this.$route.fullPath;
      return to;
    },
    myNamesAre(fullName) {
      if (!fullName) return null;
      var firstName = fullName.split(" ").slice(0, -1).join(" ");
      var lastName = fullName.split(" ").slice(-1).join(" ");
      return { firstName, lastName };
    },
    setAuth({ user, token }) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      this.$axios.setToken(token, "Bearer");
    },
    slugify(str, separator = "-") {
      str = str.trim();
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to = "aaaaaaeeeeiiiioooouuuunc------";

      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      return str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes
        .replace(/^-+/, "") // trim - from start of text
        .replace(/-+$/, "") // trim - from end of text
        .replace(/-/g, separator);
    }
  }
});
