export default {
  inserted: function (el, binding) {
    if (binding.value) {
      el.focus();
    }
  },
  update: function (el, binding) {
    if (binding.value) {
      el.focus();
    }
  }
};
