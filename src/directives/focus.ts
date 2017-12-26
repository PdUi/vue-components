export default {
  inserted: function (el: any, binding: any) {
    if (binding.value) {
      el.focus();
    }
  },
  update: function (el: any, binding: any) {
    if (binding.value) {
      el.focus();
    }
  }
};
