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
import { KeyCode } from '@/enums/keycode';
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
        new KeycodeEmitter(KeyCode.enter),
        new KeycodeEmitter(KeyCode.tab)
      ],
      typeaheadItems: [],
      advanceFocusKeycodes: [KeyCode.downarrow],
      regressFocusKeycodes: [KeyCode.uparrow]
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
