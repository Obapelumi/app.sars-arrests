export default {
  methods: {
    validateForm(formId, errorObjectName = "errors") {
      var nodes = document.querySelectorAll(`#${formId} :invalid`);
      var vm = this; // current vue instance;

      Object.keys(this[errorObjectName]).forEach((key) => {
        this[errorObjectName][key] = null;
      });

      if (nodes.length > 0) {
        nodes.forEach((node) => {
          if (node.title) {
            this[errorObjectName][node.id] = node.title;
          } else {
            this[errorObjectName][node.id] = node.validationMessage;
          }

          node.addEventListener("change", function (e) {
            vm.validateForm(formId, errorObjectName);
          });
        });

        this[errorObjectName] = Object.assign({}, this[errorObjectName]);
        return false;
      } else {
        return true;
      }
    },
    formData(data) {
      var formData = new FormData();
      for (var key in data) {
        if (!data[key]) continue;
        formData.append(key, data[key]);
      }
      return formData;
    },
    getFile(event) {
      return event.currentTarget.files[0];
    },
    readFile(file) {
      return URL.createObjectURL(file);
    }
  }
};
