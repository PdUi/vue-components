<template>
  <extended-input
    v-on:action="onAction($event)"
    v-on:key="onKey($event)"
    :inputKeycodeEmitters="keys"
    :selectableOptions="typeaheadItems"
    :advanceFocusKeycodes="advanceFocusKeycodes"
    :regressFocusKeycodes="regressFocusKeycodes">
  </extended-input>
</template>

<script>
import Keycode from '@/enums/keycode';
import KeycodeEmitter from '@/models/keycodeEmitter';
import ExtendedInput from '@/components/ExtendedInput';

export default {
  name: 'extended-input-demo',
  components: {
    ExtendedInput
  },
  data () {
    return {
      keys: [
        new KeycodeEmitter(Keycode.enter),
        new KeycodeEmitter(Keycode.tab)
      ],
      typeaheadItems: [],
      advanceFocusKeycodes: [Keycode.downarrow],
      regressFocusKeycodes: [Keycode.uparrow]
    };
  },
  methods: {
    onKey: function (event) {
      console.log(event);
      this.typeaheadItems = ['water', 'h2o'];
    },
    onAction: function (event) {
      console.log(event);
    }
  }
};
</script>

<style scoped>
</style>
